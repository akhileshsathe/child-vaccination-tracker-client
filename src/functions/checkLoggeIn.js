
export const checkLoggeIn = () => {
    const res = fetch("/ParentHome", {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((json) => {
          return json;
          
        });
      }
      else  {
        navigate("/login");
      }
    
      //   response  .then(res => res.json())
      //   .then(json => console.log(json))
    });
  };