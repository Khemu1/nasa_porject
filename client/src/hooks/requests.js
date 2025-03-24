const API_URL = "http://localhost:5000/";

async function httpGetPlanets() {
  try {
    const data = await fetch(`${API_URL}planets`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    console.log("planets arrived ", res);
    return res;
  } catch (error) {
    console.error("Error fetching planets:", error);
    throw error;
  }
}

async function httpGetLaunches() {
  try {
    const data = await fetch(`${API_URL}launches/`);
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    console.log("planets arrived ", res);
    return res;
  } catch (error) {
    console.error("Error fetching planets:", error);
    throw error;
  }
}

async function httpSubmitLaunch(launch) {
  try {
    const data = await fetch(`${API_URL}launches/`, {
      method: "POST",
      body: JSON.stringify(launch),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    console.log("planets arrived ", res);
    return res;
  } catch (error) {
    console.error("Error fetching planets:", error);
    throw error;
  }
}

async function httpAbortLaunch(id) {
  try {
    const data = await fetch(`${API_URL}launches/${id}`, {
      method: "DELETE",
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    return res;
  } catch (error) {
    console.error("Error fetching planets:", error);
    throw error;
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
