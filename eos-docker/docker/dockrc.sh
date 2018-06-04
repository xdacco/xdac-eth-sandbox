# Root key need not be imported
# 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

# Root public key (EOS..5CV)
export owner_pubkey=EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
export active_pubkey=EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV

export test1_pubkey=EOS6eGduPkScyVqYwcG3dkjR7PpWfXXnyrfM3uRrf6bLAqFjNvQSP
export test2_pubkey=EOS8esjtfgeE2RRayVgeuU2HysBVgSSy26Ay8SK8hRTBD1SvDLAaC

function keosd() {
  docker exec docker_keosd_1 "$@"
}

function cleos() {
  keosd cleos -u http://nodeosd:8888 "$@"
}

function newaccount() {
  cleos system newaccount\
    --stake-net "10 SYS" --stake-cpu "100 SYS" --buy-ram-bytes 256\
    "$@"
}
