import Particles from "react-particles-js"
import particlesConfig from "./particle-config"

function ParticleBackground() {
    return (
        <Particles params={particlesConfig}></Particles>
    );
}

export default ParticleBackground;