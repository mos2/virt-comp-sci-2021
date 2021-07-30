#/bin/bash

alphabet=("idk" "how" "to" "copy" "paste" "from" "nano" "but" "im" "not" "bothered" "to" "type" "out" "the" "alphabet" "just" "imagine" "its" "here")

sleep 200

for i in {1..3}
do
  index=$((RANDOM % ${#alphabet[@]}))
  rng=${alphabet[$index]}

  string_var_name=str_$i
  declare $string_var_name=${rng}

  echo ${!string_var_name}
done
