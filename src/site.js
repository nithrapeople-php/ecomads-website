import './style.css'

function initNav() {
  const toggle = document.querySelector('.nav-toggle')
  const links = document.querySelector('.nav-links')
  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('is-open')
    toggle.setAttribute('aria-expanded', String(open))
  })
  links?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open')
      toggle?.setAttribute('aria-expanded', 'false')
    })
  })
}

function initReveal() {
  const els = document.querySelectorAll('.reveal')
  if (!els.length) return
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.12 }
  )
  els.forEach((el) => io.observe(el))
}

function preselectService() {
  const params = new URLSearchParams(window.location.search)
  const selected = params.get('service')
  if (!selected) return
  const select = document.querySelector('select[name="service"]')
  if (!select) return
  const option = [...select.options].find((o) => o.value === selected || o.textContent === selected)
  if (option) {
    select.value = option.value || option.textContent
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
const PHONE_RE = /^[0-9][0-9\s\-()]{6,18}$/
const DIAL_RE = /^\+[0-9]{1,4}$/

function setHint(name, message) {
  const hint = document.querySelector(`.field-hint[data-for="${name}"]`)
  if (!hint) return
  if (message) {
    hint.textContent = message
    hint.hidden = false
  } else {
    hint.textContent = ''
    hint.hidden = true
  }
}

function getDialCode() {
  const codeSelect = document.querySelector('#country_code')
  const custom = document.querySelector('#custom_country_code')
  if (!codeSelect) return ''
  if (codeSelect.value === 'other') {
    return (custom?.value || '').trim()
  }
  return codeSelect.value
}

function syncFullPhone() {
  const phone = document.querySelector('#phone')
  const full = document.querySelector('#full_phone')
  if (!phone || !full) return
  const dial = getDialCode()
  const digits = phone.value.trim()
  full.value = dial && digits ? `${dial} ${digits}` : ''
}

function initPhoneCountry() {
  const codeSelect = document.querySelector('#country_code')
  const custom = document.querySelector('#custom_country_code')
  const phone = document.querySelector('#phone')
  if (!codeSelect || !custom) return

  const toggleCustom = () => {
    const isOther = codeSelect.value === 'other'
    codeSelect.classList.toggle('is-collapsed', isOther)
    custom.classList.toggle('is-collapsed', !isOther)
    custom.required = isOther
    custom.tabIndex = isOther ? 0 : -1
    if (!isOther) {
      custom.value = ''
      custom.setCustomValidity('')
    } else {
      custom.focus()
    }
    syncFullPhone()
  }

  codeSelect.addEventListener('change', toggleCustom)
  custom.addEventListener('input', syncFullPhone)
  phone?.addEventListener('input', syncFullPhone)
  toggleCustom()
}

function initContactValidation() {
  const form = document.querySelector('#contact-form')
  if (!form) return

  const email = form.querySelector('#email')
  const phone = form.querySelector('#phone')
  const custom = form.querySelector('#custom_country_code')
  const codeSelect = form.querySelector('#country_code')

  const validateEmail = () => {
    if (!email) return true
    const value = email.value.trim()
    if (!value) {
      email.setCustomValidity('Email is required')
      setHint('email', 'Email is required')
      return false
    }
    if (!EMAIL_RE.test(value)) {
      email.setCustomValidity('Enter a valid email like you@company.com')
      setHint('email', 'Enter a valid email like you@company.com')
      return false
    }
    email.setCustomValidity('')
    setHint('email', '')
    return true
  }

  const validatePhone = () => {
    if (!phone) return true
    const dial = getDialCode()
    const value = phone.value.trim()

    if (codeSelect?.value === 'other') {
      if (!DIAL_RE.test(dial)) {
        custom?.setCustomValidity('Enter a dial code like +91')
        setHint('phone', 'Enter a valid country code like +91')
        return false
      }
      custom?.setCustomValidity('')
    }

    if (!value) {
      phone.setCustomValidity('Phone number is required')
      setHint('phone', 'Phone number is required')
      return false
    }
    if (!PHONE_RE.test(value)) {
      phone.setCustomValidity('Enter a valid phone number')
      setHint('phone', 'Use 7–15 digits (spaces or dashes ok)')
      return false
    }

    phone.setCustomValidity('')
    setHint('phone', '')
    syncFullPhone()
    return true
  }

  email?.addEventListener('input', validateEmail)
  email?.addEventListener('blur', validateEmail)
  phone?.addEventListener('input', validatePhone)
  phone?.addEventListener('blur', validatePhone)
  custom?.addEventListener('input', validatePhone)
  codeSelect?.addEventListener('change', validatePhone)

  form.addEventListener('submit', (e) => {
    const emailOk = validateEmail()
    const phoneOk = validatePhone()
    syncFullPhone()
    if (!emailOk || !phoneOk || !form.checkValidity()) {
      e.preventDefault()
      form.reportValidity()
      if (!emailOk) email?.focus()
      else if (!phoneOk) phone?.focus()
    }
  })
}

initNav()
initReveal()
preselectService()
initPhoneCountry()
initContactValidation()
