async function deleteCompany(id) {
  fetch("/companies/" + id, { method: "DELETE" }).then((response) => {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    } else if (response.status === 200) {
      document.location.href = "/";
    }
  });
}

async function deleteLocation(id) {
  fetch("/locations/" + id, { method: "DELETE" }).then((response) => {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    } else if (response.status === 200) {
      location.reload();
    }
  });
}

async function deleteMenu(id) {
  fetch("/menus/" + id, { method: "DELETE" }).then((response) => {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    } else if (response.status === 200) {
      location.reload();
    }
  });
}
