#START_CMD="ssh -L 0.0.0.0:23457:10.8.6.2:23457 -N 10.8.6.2 &"
START_CMD="sh ssh.sh"

while true
do
    All_Process_Pid=`pgrep -f "ssh -L"`
    echo ${All_Process_Pid}
    flag=0
    for i in ${All_Process_Pid}
    do
         if [ "$(ps -q $i -o state --no-headers)" = "S" ];
         then
            flag=1
         fi
    done

    if [ $flag = 0 ];
    then
        echo "flag is 0"
        pkill -9 -f "ssh -L"
        ${START_CMD}
    else
        echo "flag is 1"
    fi

    sleep 5m
done