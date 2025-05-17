export function Wave() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      /*   ↓  altura fixa menor; colado embaixo da section  */
      className="absolute inset-x-0 bottom-0 w-full h-[550px] pointer-events-none z-0"
      /*   ↓  permite que o conteúdo estique para caber na nova altura  */
      preserveAspectRatio="none"
      viewBox="0 0 1600 900"
    >
      <defs>
        <linearGradient id="bg">
          <stop offset="100%" stopColor="#2B6BB1" />
        </linearGradient>

        <path
          id="wave"
          fill="url(#bg)"
          d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
             s371.981,38.998,575.971,0
             s293.985-39.278,505.474,5.859
             s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
        />
      </defs>

      <g>
        {/* três camadas animadas, mantidas iguais */}
        <use xlinkHref="#wave" opacity=".3">
          <animateTransform
            attributeName="transform"
            type="translate"
            dur="10s"
            values="270 230;-334 180;270 230"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;.5;1"
            keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
          />
        </use>

        <use xlinkHref="#wave" opacity=".6">
          <animateTransform
            attributeName="transform"
            type="translate"
            dur="8s"
            values="-270 230;243 220;-270 230"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;.6;1"
            keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
          />
        </use>

        <use xlinkHref="#wave" opacity=".8">
          <animateTransform
            attributeName="transform"
            type="translate"
            dur="6s"
            values="0 230;-140 200;0 230"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;.4;1"
            keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
          />
        </use>
      </g>
    </svg>
  );
}
