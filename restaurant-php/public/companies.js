const getCompanies = async () => {
  const response = await fetch("http://localhost:3000/companies");
  const myJson = await response.json(); //extract JSON from the http response
  let companiesDisplay = "";
  myJson.forEach(
    (element) =>
      (companiesDisplay += `
     <div class="card">
      <a href="/companies/${element["id"]}/info" class="viewInfo">
        <img
          src="${element["logoUrl"]}"
          alt="Avatar"
          style="width: 200px; margin: 25px 50px"
        />

        <div class="container">
          <h4 class="companyName"><b>${element["name"]}</b></h4>
        </div>
      </a>
    </div>
    `)
  );
  document.getElementById("companies").innerHTML = companiesDisplay;
};

getCompanies();
