// create manager card
const createManagerCard = function (manager) {
  return `
      <div class="col-4 mt-4">
        <div class="card h-100">
            <div class="card-header">
                <h3>${manager.name}</h3>
                <h4>Manager</h4><i class="material-icons">content_paste</i>
            </div>
            <div class="card-body">
                <p class="id">ID: ${manager.id}</p>
                <p class="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
                <p class="office">Office Number: ${manager.officeNumber}</p>
            </div>
        </div>
    </div>
  `;
};

template = (data) => {
  // creates and array of cards
  pageArrayList = [];

  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    const role = employee.getRole();

    // creates and push Manager function
    if (role === "Manager") {
      const managerCard = template(employee);

      pageArrayList.push(managerCard);
    }
  }
};

module.exports = template;
