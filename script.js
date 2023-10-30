const btnGet = document.querySelector(".btnGet");
const btnPost = document.querySelector(".btnPost");

const getUsers = async () => {
  try {
    const res = await fetch("https://reqres.in/api/users");
    const data = await res.json();

    if (!res.ok) {
      console.log(data.description);
      return;
    }

    console.log(data.data);
  } catch (error) {
    console.log(error);
  }
};

const job = document.getElementById("job").value;
const name = document.getElementById("nombre").value;

const postUsers = async () => {
  try {
    const datos = {
      name: "Juan",
      job: "job",
    };
    const res = await fetch("https://reqres.in/api/users", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(datos),
    });
    const data = await res.json();

    if (!res.ok) {
      console.log(data.description);
      return;
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

btnGet.addEventListener("click", getUsers);
btnPost.addEventListener("click", postUsers);
