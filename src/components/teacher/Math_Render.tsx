'use client';

import { useRef } from 'react';
import MathInput from 'react-math-keyboard';
import renderMathInElement from 'utils/renderMath.mjs';

function Render_Math(props: {
  display: boolean;
  latex;
  setLatex;
  onFocus;
  setRenderMathDisplay;
}) {
  const { display, latex, setLatex, onFocus, setRenderMathDisplay } = props;
  const mathInputStyle: React.CSSProperties = {
    color: 'black',
    fontSize: '30px',
  };
  const firstMathfieldRef = useRef<any>();
  const clear = () => {
    firstMathfieldRef.current?.latex('');
  };
  return (
    <div
      className={`${
        display ? '' : 'hidden'
      } flex grid h-full w-full grid-rows-4 items-center justify-center`}
    >
      <div 
      className="row-span-2 flex flex-col place-items-center gap-5"
      onClick={(e) => {
        e.stopPropagation();
      }}
      >
        <div className="flex min-w-96 place-items-center rounded-xl bg-white p-2.5">
          <MathInput
            numericToolbarKeys={[
              /**operations */
              'log',
              'ln',
              'sin',
              'cos',
              'tan',
              'abs',
              'fx',
              {
                id: 'int',
                label: '\\int',
                labelType: 'tex',
                mathfieldInstructions: {
                  content: '\\int',
                  method: 'write',
                },
              },
              'infty',
              'approx',
              'belongs',
              'notin',
              'cap',
              'cup',
              'varnothing',
              'rightarrow',
              'overrightarrow',
              'degree',
              'un',
              'overline',
              {
                id: 'underline',
                label: '\\underline{z}',
                labelType: 'tex',
                mathfieldInstructions: {
                  content: 'underline',
                  method: 'cmd',
                },
              },
              'binom',
              'alpha',
              'beta',
              'delta',
              'Delta',
              'sigma',
              'theta',
              'tau',
              'pi',
              'phi',
              'Omega',
              'lambda',
              'mu',
              'gamma',
              'omega',
            ]}
            setValue={setLatex}
            style={mathInputStyle}
            setMathfieldRef={(mathfield: any) =>
              (firstMathfieldRef.current = mathfield)
            }
            lang="en"
          />
        </div>
        <button
        type='button'
          onClick={() => {
            const span = document.createElement('span');
            span.innerText = String.raw`\(${latex}\)`;
            console.log(onFocus);
            document.getElementById(onFocus).appendChild(span);
            // Manually trigger the input event this need stop propagation
            var event = new Event('input', {
              bubbles: true,
              cancelable: true,
            });
            document.getElementById(onFocus).dispatchEvent(event);
            document.getElementById(onFocus).addEventListener("input", function(event) {
              event.preventDefault();
            });
            renderMathInElement(document.body);
            clear();
            setRenderMathDisplay(false);
          }}
          className="min-h-[50px] min-w-96 rounded-md bg-brand-700 p-3"
        >
          Thêm
        </button>
      </div>
    </div>
  );
}
export default Render_Math;