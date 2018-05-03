<template>
    <div class="row">
        <div class="one-half column">
            <div>
                <label for="">Your name</label>
                <input type="text" name="" />
            </div>
            <div>
                <label for="">Your company name</label>
                <input type="text" name="" value="" />
            </div>
            <div>
                <label for="">Your company details</label>
                <textarea rows="5" cols="50" name="company_details" id="" placeholder="Company name, address"></textarea>
            </div>
            <div>
                <label for="">Your country</label>
                <select id="company-details-form-country" name="country" required>
                    <optgroup>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="IN">India</option>
                    </optgroup>
                    <optgroup label="-----------">
                        <!-- -->
                    </optgroup>
                </select>
            </div>
            <div>
                <label for="">Your company VAT number</label>
                <input type="text" name="company_vat" placeholder="Your company VAT number" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    }
}
</script>

<style lang="less" scoped>

</style>
