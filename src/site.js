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

function showFormSuccess() {
  const params = new URLSearchParams(window.location.search)
  if (params.get('sent') !== '1') return
  const success = document.querySelector('#form-success')
  const form = document.querySelector('#contact-form')
  if (success) success.hidden = false
  if (form) form.hidden = true
}

initNav()
initReveal()
preselectService()
showFormSuccess()
