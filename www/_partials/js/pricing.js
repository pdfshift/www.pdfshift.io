// Pricing:
(function (basePricing) {
    if (basePricing.length === 0) {
        return;
    }

    var settings = {fill: '#9164B3', background: '#ECECEC'},
        rangeSlider = basePricing.querySelector('.js-range input'),
        rangeParts = [50, 5000, 25000, 100000, 500000, 1000000, 'Custom'],
        cardsElements = basePricing.querySelectorAll('.pricing__card-wrapper>label');

    var pricingActions = {
        '_updateSlider': function (percentage) {
            // Update the style of the slider
            rangeSlider.style.background = 'linear-gradient(90deg, ' + settings.fill + ' ' + percentage + '%, ' + settings.background + ' ' + (percentage + 0.1) + '%)';

            // Update the labels active state
            var pieces = 100 / (rangeParts.length - 1),
                activated = Math.floor(percentage / pieces),
                labels = rangeSlider.parentNode.querySelectorAll('.pricing__slider__values>div');
            
            for (var i = 0; i < labels.length; i++) {
                if (i <= activated) {
                    labels[i].classList.add('active');
                } else {
                    labels[i].classList.remove('active');
                }
            }

        },
        '_updateCards': function (amount) {
            var selectedCard = null;
            for (var i = 0; i < cardsElements.length; i++) {
                if (parseInt(cardsElements[i].querySelector('input').value) >= amount) {
                    selectedCard = cardsElements[i];
                    break;
                }
            }

            if (selectedCard !== null) {
                selectedCard.querySelector('input').checked = true;
                selectedCard.parentNode.scroll({top: selectedCard.offsetTop - (selectedCard.parentNode.clientHeight / 2), behavior: 'smooth'});
            } else {
                var checked = basePricing.querySelector('.pricing__card-wrapper>label input:checked');
                if (checked) {
                    checked.checked = false;
                }
            }
        },
        '_updateCard': function () {
            var card = basePricing.querySelector('.pricing__card-wrapper>label input:checked').parentNode,
                details = card.querySelectorAll('.pricing__card-item>div');
            
            basePricing.querySelector('.pricing__main .pricing__main-card__title').innerText = card.dataset['name'];

            if (details[2].innerText.toLowerCase() === 'free') {
                basePricing.querySelector('.pricing__main .pricing__main-card__price').innerHTML = 'Free';
            } else {
                basePricing.querySelector('.pricing__main .pricing__main-card__price').innerHTML = details[2].innerText.replace(' USD', '') + '<span>mo</span>';
            }

            var options = basePricing.querySelectorAll('.pricing__main .pricing__main-card__body strong');
            options[0].innerText = details[0].innerText;
            options[1].innerText = details[1].innerText;
        },
        'getAmountFromPercentage': function (percentage) {
            percentage = parseInt(percentage);
            if (percentage === 0) {
                return rangeParts[0];
            }
            else if (percentage === 100) {
                return rangeParts[rangeParts.length - 1];
            }

            var pieces = 100 / (rangeParts.length - 1),
                position = percentage / pieces,
                subpercent = position % 1; // We get the decimal parts

            if (isNaN(rangeParts[Math.ceil(position)])) {
                if (percentage <= Math.ceil((100 / (rangeParts.length - 1)) * Math.floor(position))) {
                    return rangeParts[Math.floor(position)];
                }
                return rangeParts[Math.ceil(position)];
            }

            var minValue = rangeParts[Math.floor(position)],
                maxValue = rangeParts[Math.ceil(position)],
                deltaValue = maxValue - minValue;

            return minValue + (deltaValue * subpercent);
        },
        'getPercentageFromAmount': function (amount) {
            if (amount <= rangeParts[0]) {
                return 0;
            }

            var position = 1;
            for (position; position < rangeParts.length; position++) {
                if (isNaN(rangeParts[position])) {
                    return 100;
                }

                if (amount <= rangeParts[position]) {
                    break
                }
            }

            var pieces = 100 / (rangeParts.length - 1),
                middleValue = (amount - rangeParts[position - 1]) / (rangeParts[position] - rangeParts[position - 1]);

            return pieces * (position - 1) + (pieces * middleValue);
        },
        'update': function (amount, origin, percentage) {
            amount = parseInt(amount);
            if (origin) {
                PDFShift.storage.set('quantity', amount);
            }


            if (!percentage) {
                percentage = this.getPercentageFromAmount(amount);
            }

            this._updateSlider(percentage);
            // Update the cards selection if it wasn't coming from it
            if (origin !== 'cards') {
                this._updateCards(amount);
            }

            // Update the slider if it wasn't coming from it
            if (origin !== 'slider') {
                rangeSlider.value = percentage;
            }

            // Update the quantity if it wasn't coming from it
            if (origin !== 'quantity') {
                basePricing.querySelector('.pricing__main-input input').value = amount;
            }

            // Toggling the right card
            if (isNaN(amount) || amount > rangeParts[rangeParts.length - 2]) {
                basePricing.querySelector('.pricing__main .pricing__main-plans').style.display = 'none';
                basePricing.querySelector('.pricing__main .pricing__main-enterprise').style.display = 'block';
            } else {
                basePricing.querySelector('.pricing__main .pricing__main-enterprise').style.display = 'none';
                basePricing.querySelector('.pricing__main .pricing__main-plans').style.display = 'block';
                this._updateCard();
            }
        }
    };

    PDFShift.on('#pricing .js-range input', 'input', function (event) {
        var amount = pricingActions.getAmountFromPercentage(event.target.value);
        pricingActions.update(amount, 'slider', parseInt(event.target.value));
    });

    PDFShift.on('#pricing .pricing__main-input input', 'input', function (event) {
        pricingActions.update(event.target.value, 'quantity');
    });

    PDFShift.on('#pricing .pricing__card-wrapper>label', 'change', 'input', function (event) {
        event.stopPropagation();
        pricingActions.update(event.target.value, 'cards');
    })

    pricingActions.update(100000);
})(document.querySelector('#pricing'));