#!/bin/bash
FILES_PATTERN='\.rb(\..+)?$'
FORBIDDEN='NOPASS'
git diff --cached --name-only | \
  grep -spec/ | \
  grep -E $FILES_PATTERN | \
  xargs grep --with-filename -n $FORBIDDEN && echo "COMMIT REJECTED Found '$FORBIDDEN' references. Please remove them before commiting" && exit 1
