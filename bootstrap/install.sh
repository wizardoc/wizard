:<< !
  Link local package to that's need after yarn install by lerna
!

# path constant
ROOT_PATH='./'
ROOT_PACKAGE_JSON_PATH="${ROOT_PATH}package.json"

# local pakcages that's need install
LOCAL_PKG_NEED=(shared)

# peek packages
function package_peeker() {
  root_package_json_content=`cat ${ROOT_PACKAGE_JSON_PATH}`
  regex="\"packages\":\s*\[\s*([^\]+)]"

  if [[ $root_package_json_content =~ $regex ]];then
    # split by regex replace
    packages=(${BASH_REMATCH[1]//,/})

    for package_name in $packages
    do
      dep_checker ${package_name//\"/}
    done
  fi
}

# check @wizard/shared is exist
function dep_checker() {
  package_json_content=`cat $ROOT_PATH$1/package.json`

  for package_name in $LOCAL_PKG_NEED
  do
    regex="\"dependencies\"\s*:\s*\{\s*(.|\s)+?\"(@wizard\/$package_name)\".+"

    if [[ $package_json_content =~ $regex ]];then
      lerna_install ${BASH_REMATCH[1]} @wizard/$1
    fi
  done
}

# npx
function npx() {
  ${ROOT_PATH}/node_modules/.bin/$1 $2
}

function lerna_install() {
  npx lerna `$1 --scope $2`
}

package_peeker
