import { AnimatedTitle } from "./slogan-components/animated-title"
import { StaticText } from "./slogan-components/static-text";

export function Slogan() {
    return (
        <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-semibold">
                Insper Code
                <AnimatedTitle />
            </h1>
            <div className="h-8">
                <StaticText />
            </div>
        </div>
    );
};