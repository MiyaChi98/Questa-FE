'use client'

function Render_Math(
    props: {
    }
) {
  return (
  <>
  <span
  id="katexContainer"
  aria-valuetext="This is an katex"
  >
    <span 
    id="katexValue"
    hidden
    ></span>
    <span hidden>$$Questa_katex_begin$$</span>
    <span 
    id="katexDisplay"
    >
      katex display
    </span>
    <span hidden>$$Questa_katex_end$$</span>
  </span>
  </>)       
}
export default Render_Math