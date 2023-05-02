const resultDay = document.getElementById('result-day')
const resultMonth = document.getElementById('result-month')
const resultYear = document.getElementById('result-year')
const form = document.getElementById('form')
const dayError = document.getElementById('day-error')
const monthError = document.getElementById('month-error')
const yearError = document.getElementById('year-error')

const labelEl = document.querySelectorAll('label')
const inputEl = document.querySelectorAll('input')

form.addEventListener('submit', formValidation)

function formValidation(e) {
  e.preventDefault()
  const day = parseInt(form.elements['day-input'].value)
  const month = parseInt(form.elements['month-input'].value)
  const year = parseInt(form.elements['year-input'].value)
  const maxDaysInMonth = getMaxDaysInMonth(month, year)

  let hasError = false

  if (!day || day < 1 || day > maxDaysInMonth) {
    labelEl[0].style.color = 'hsl(0, 100%, 67%)'
    inputEl[0].style.border = '1.2px solid hsl(0, 100%, 67%)'
    hasError = true
  } else {
    labelEl[0].style.color = 'hsl(0, 1%, 44%)'
    inputEl[0].style.border = '1.2px solid hsl(0, 0%, 86%)'
  }

  if (!month || month < 1 || month > 12) {
    labelEl[1].style.color = 'hsl(0, 100%, 67%)'
    inputEl[1].style.border = '1.2px solid hsl(0, 100%, 67%)'
    hasError = true
  } else {
    labelEl[1].style.color = 'hsl(0, 1%, 44%)'
    inputEl[1].style.border = '1.2px solid hsl(0, 0%, 86%)'
  }

  const currentYear = new Date().getFullYear()
  if (!year || year >= currentYear) {
    labelEl[2].style.color = 'hsl(0, 100%, 67%)'
    inputEl[2].style.border = '1.2px solid hsl(0, 100%, 67%)'
    hasError = true
  } else {
    labelEl[2].style.color = 'hsl(0, 1%, 44%)'
    inputEl[2].style.border = '1.2px solid hsl(0, 0%, 86%)'

  }

  if (!day) {
    dayError.innerText = 'this field is required'
  } else if (day < 1 || day > 31) {
    dayError.innerText = 'must be a valid day'
    
  } else if (day > maxDaysInMonth) {
    dayError.innerText = 'must be a valid day'
    labelEl[1].style.color = 'hsl(0, 100%, 67%)'
    inputEl[1].style.border = '1.2px solid hsl(0, 100%, 67%)'
    labelEl[2].style.color = 'hsl(0, 100%, 67%)'
    inputEl[2].style.border = '1.2px solid hsl(0, 100%, 67%)'
    hasError = false
  } else {
    dayError.innerText = ''
  }

  if (!month) {
    monthError.innerText = 'this field is required'
  } else if (month < 1 || month > 12) {
    monthError.innerText = 'must be a valid month'
  } else {
    monthError.innerText = ''
  }

  if (!year) {
    yearError.innerText = 'this field is required'
  } else if (year >= currentYear) {
    yearError.innerText = 'must be in the past'
  } else {
    yearError.innerText = ''
  }

  if (hasError) {
    return // stop execution of the function
  }
  
  const birthDate = new Date(year, month - 1, day)
  ageCalculation(birthDate)
  
}

//get max days in months
function getMaxDaysInMonth(month, year) {
  const lastDayOfMonth = new Date(year, month, 0).getDate()
  return lastDayOfMonth
}

//calculate age function
function ageCalculation(birthDate) {
  const currentDate = new Date()
  const birthYear = birthDate.getFullYear()
  const birthMonth = birthDate.getMonth() + 1
  const birthDay = birthDate.getDate()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const currentDay = currentDate.getDate()

  let years = currentYear - birthYear
  let months = currentMonth - birthMonth
  let days = currentDay - birthDay

  if (months < 0 || (months === 0 && days < 0)) {
    years--
    months += 12
  }

  if (days < 0) {
    const maxDaysInPrevMonth = getMaxDaysInMonth(currentMonth - 1, currentYear)
    days += maxDaysInPrevMonth
    months--
  }
  //age results in days, month and year 
  resultYear.textContent = years
  resultMonth.textContent = months
  resultDay.textContent = days
}






