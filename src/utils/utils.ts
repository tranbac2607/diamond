export const setDataLocalStorage = (data: any) => {
  localStorage.setItem('TOKEN', data.loginToken);
  localStorage.setItem('CUSTOMER_NAME', data.customerName);
  localStorage.setItem('CUSTOMER_ID', data.customerId);
  localStorage.setItem('EMPLOYEE_ID', data.employeeId);
  localStorage.setItem('ROLE', data.role);
};
