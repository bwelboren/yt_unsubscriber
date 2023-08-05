/** 
  * Youtube bulk unsubsribe fn.
 * Wrapping this in an IIFE for browser compatibility.
 * Taken from https://www.alphr.com/mass-unsubscribe-youtube/ and updated to work for dutch yt version
  */
(async function iife() {
   // This is the time delay after which the "unsubscribe" button is "clicked"; Tweak to your liking!
  var UNSUBSCRIBE_DELAY_TIME = 15000 // Tested and cannot be less than 10s due to spamfilter
 
/**
  * Delay runner. Wraps `setTimeout` so it can be `await`ed on. 
 * @param {Function} fn 
  * @param {number} delay 
 */
   var runAfterDelay = (fn, delay) => new Promise((resolve, reject) => {
    setTimeout(() => {
       fn()
      resolve()
     }, delay)
  })
 

 
  // Get the channel list; this can be considered a row in the page.
   var channels = Array.from(document.getElementsByTagName(`ytd-channel-renderer`))
  console.log(`${channels.length} channels found.`)
 
  var ctr = 0
   for (const channel of channels) {
    // Get the subsribe button and trigger a "click"
     channel.querySelector(`[aria-label^='Afmelden']`).click()
    await runAfterDelay(() => {
       // Get the dialog container...
      document.getElementsByTagName(`yt-confirm-dialog-renderer`)[0].querySelector('.yt-spec-button-shape-next--call-to-action').click()
       console.log(`Unsubsribed ${ctr + 1}/${channels.length}`)
      ctr++
     }, UNSUBSCRIBE_DELAY_TIME)
  }
 })()
