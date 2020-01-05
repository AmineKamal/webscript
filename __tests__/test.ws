let N 2;

if b{12 == 12 && N >= 2};
    if b{14 == 13};
        let url http://twitter.com;
    else;
        let url http://metro.ca;
    fi;
elif b{13 == 12};
    let url http://www.google.com;
else;
    let url http://www.instagram.com;
fi;

goto url;
wait 1000;

eval js{

    console.log(document.getElementById("test"));
};