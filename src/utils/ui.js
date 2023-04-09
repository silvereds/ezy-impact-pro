import { slideToggle, slideUp } from './libs/slide'
import Poppers from './libs/poppers'

function initUiManipulation() {
  const PoppersInstance = new Poppers()

  /**
   * wait for the current animation to finish and update poppers position
   */
  const updatePoppersTimeout = () => {
    setTimeout(() => {
      PoppersInstance.updatePoppers()
    }, 300)
  }

  /**
   * sidebar collapse handler
   */
  document.getElementById('btn-collapse').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed')
    PoppersInstance.closePoppers()
    if (document.getElementById('sidebar').classList?.contains('collapsed'))
      document.querySelectorAll('.menu > ul > .menu-item.sub-menu > a').forEach((element) => {
        element.parentElement.classList.remove('open')
      })

    updatePoppersTimeout()
  })

  /**
   * sidebar toggle handler (on break point )
   */
  document.getElementById('btn-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('toggled')

    updatePoppersTimeout()
  })

  /**
   * toggle sidebar on overlay click
   */
  document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('toggled')
  })

  const defaultOpenMenus = document.querySelectorAll('.menu-item.sub-menu.open')

  defaultOpenMenus.forEach((element) => {
    element.lastElementChild.style.display = 'block'
  })

  /**
   * handle top level submenu click
   */
  document.querySelectorAll('.menu > ul > .menu-item.sub-menu > a').forEach((element) => {
    element.addEventListener('click', () => {
      if (document.getElementById('sidebar').classList.contains('collapsed'))
        PoppersInstance.togglePopper(element.nextElementSibling)
      else {
        /**
         * if menu has "open-current-only" class then only one submenu opens at a time
         */
        const parentMenu = element.closest('.menu.open-current-submenu')
        if (parentMenu)
          parentMenu
            .querySelectorAll(':scope > ul > .menu-item.sub-menu > a')
            .forEach(
              (el) =>
                window.getComputedStyle(el.nextElementSibling).display !== 'none' &&
                slideUp(el.nextElementSibling)
            )
        slideToggle(element.nextElementSibling)
      }
    })
  })

  /**
   * handle inner submenu click
   */
  document
    .querySelectorAll('.menu > ul > .menu-item.sub-menu .menu-item.sub-menu > a')
    .forEach((element) => {
      element.addEventListener('click', () => {
        slideToggle(element.nextElementSibling)
      })
    })
}
export default initUiManipulation
