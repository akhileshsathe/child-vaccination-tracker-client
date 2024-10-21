const getAge = (dob1,c) => {
    var today = new Date();
    var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    const diffMilliseconds = Math.abs(today - birthDate);

    switch(c){
        case "d":return Math.floor(diffMilliseconds / 86400000);
        case "w":return Math.floor(diffMilliseconds / 86400000/7);
        case "M":return Math.floor(diffMilliseconds / 86400000/30);
        case "Y":return today.getFullYear() - birthDate.getFullYear();
    }

    
  }