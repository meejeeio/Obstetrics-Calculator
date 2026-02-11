 const DAYS_IN_MONTH = 30;
  const DAYS_IN_YEAR = 360;
  const years = [2081, 2082, 2083, 2084, 2085];

  function fill(id, values, label) {
    const el = document.getElementById(id);
    el.innerHTML = `<option value="">${label}</option>`;
    values.forEach(v => el.innerHTML += `<option>${v}</option>`);
    el.addEventListener("change", calculate);
  }

  function setup() {
    fill("xYear", years, "Year");
    fill("yYear", years, "Year");
    fill("xMonth", [...Array(12).keys()].map(i => i + 1), "Month");
    fill("yMonth", [...Array(12).keys()].map(i => i + 1), "Month");
    fill("xDay", [...Array(30).keys()].map(i => i + 1), "Day");
    fill("yDay", [...Array(30).keys()].map(i => i + 1), "Day");

    const saved = localStorage.getItem("darkMode");
    if (saved === "true") document.body.classList.add("dark");
  }

  function toggleDark() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
  }

  function clearErrors() {
    document.querySelectorAll(".field-error").forEach(e => e.textContent = "");
  }

  function toDays(d) {
    return (d.year - 2081) * DAYS_IN_YEAR + (d.month - 1) * 30 + (d.day - 1);
  }

  function fromDays(t) {
    const year = 2081 + Math.floor(t / DAYS_IN_YEAR);
    const rem = t % DAYS_IN_YEAR;
    return {
      year,
      month: Math.floor(rem / 30) + 1,
      day: (rem % 30) + 1
    };
  }

  function calculate() {
    clearErrors();

    const x = { year:+xYear.value, month:+xMonth.value, day:+xDay.value };
    const y = { year:+yYear.value, month:+yMonth.value, day:+yDay.value };

    let ok = true;
    ["xYear","xMonth","xDay","yYear","yMonth","yDay"].forEach(id=>{
      if (!document.getElementById(id).value) {
        document.getElementById(id+"Err").textContent = "Required";
        ok = false;
      }
    });

    if (!ok) {
      result.textContent = "Please complete all fields";
      return;
    }



    const diff = Math.abs(toDays(y) - toDays(x));
    const weeks = Math.floor(diff / 7);
    const days = diff % 7;

    const future = fromDays(toDays(y) + (9 * 30) + 7);

    result.innerHTML = `
      <strong>POG Week:</strong><br>
      ${weeks} weeks + ${days} days<br><br>
      <strong>Estimated Delivery Date:</strong><br>
      ${future.year}/${future.month}/${future.day}
    `;
  }

  setup();
