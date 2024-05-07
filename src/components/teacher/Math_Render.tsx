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
  cursorPosition: number
}) {
  const { display, latex, setLatex, onFocus, setRenderMathDisplay , cursorPosition} = props;
  const mathInputStyle: React.CSSProperties = {
    color: 'black',
    fontSize: '30px',
  };
  const firstMathfieldRef = useRef<any>();
  const clear = () => {
    firstMathfieldRef.current?.latex('');
  };
  const preStringProcessor = (inputString) => {
    const regex = /\*katex\*([^*]+?)\*katex\*/g;
    const regex1 = /\*begin\*([^*]+?)\*end\*/g;
    const processedString = inputString.replace(regex, (match, content) => {
      console.log(String.raw`\(${content}\)`);
      return String.raw`\(${content}\)`;
    });
    const finalString = processedString.replace(regex1, '');
    console.log(finalString);
    return finalString;
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
          type="button"
          onClick={() => {
            // const span = document.createElement('span');
            // span.innerText = String.raw`\(${latex}\)`;
            // console.log(onFocus);
            const element = document.getElementById(onFocus)
            const startPosition = cursorPosition;
            const endPosition = cursorPosition;
            console.log(startPosition)
            const text = element.textContent;
            const newText = preStringProcessor(text.slice(0, startPosition)) + ' ' +  String.raw`\(${latex}\)` +' '+ preStringProcessor(text.slice(endPosition));
            console.log(newText)
            element.innerText = newText;
            // Manually trigger the input event this need stop propagation
            var event = new Event('input', {
              bubbles: true,
              cancelable: true,
            });
            document.getElementById(onFocus).dispatchEvent(event);
            document.getElementById(onFocus).addEventListener('input', function (event) {
                event.preventDefault();
              });
            renderMathInElement(document.body);
            clear();
            setRenderMathDisplay(false);
          }}
          className="min-h-[50px] min-w-96 rounded-md text-white bg-brand-700 p-3 hover:bg-blue-900"
        >
          Thêm
        </button>
      </div>
    </div>
  );
}
export default Render_Math;
