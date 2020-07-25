import React, {Component, createRef} from "react";
import "./Cropper.css";
import avatar from "./icons/pet-avatar.png";
import wideImg from "./icons/3aG6ZhW.png"
import largeImg from "./icons/asdfdfs.jpg"

class Cropper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canvasWidth: 500,
            canvasHeight: 500,
            scale: 1,
            deltaScale: 0.05,
            zoomInCounter: 0
        }
        this.canvas = createRef();
        this.image = null;
        this.zoomInCounter = 0;
    }

    componentDidMount() {
        this.renderImg(this.state.scale);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //this.renderImg(this.state.scale);
    }

    renderImg = (scale) => {
        let img = new Image();
        img.src = largeImg;
        img.onload = () => {
            const imgRatio = img.width/img.height;
            const canvasRatio = this.state.canvasWidth/this.state.canvasHeight;
            const ctx = this.canvas.current.getContext("2d");
            ctx.scale(scale, scale);

            if (imgRatio >= canvasRatio) {
                const width = this.state.canvasHeight * imgRatio;
                ctx.drawImage(img, 0, 0, width, this.state.canvasHeight);
            }
            if (imgRatio < canvasRatio) {
                const height = this.state.canvasWidth / imgRatio;
                ctx.drawImage(img, 0, 0, this.state.canvasWidth, height);
            }
        }
        this.image = img;
        console.log(this.state.scale);
    }

    _obsoleteMouseScroll = (event) => {
        event.preventDefault();
        let deltaScale = 0;
        let deltaZoomIn = 0;
        // Si el scroll es hacia abajo
        if (event.deltaY > 0 && this.state.zoomInCounter > 0) {
            deltaScale = -this.state.deltaScale;
            deltaZoomIn = -1;
        }
        // Si el scroll es hacia arriba
        if (event.deltaY < 0) {
            deltaScale = this.state.deltaScale;
            deltaZoomIn = 1
        }
        /*¿Por qué en el siguiente this.setState usamos una función con prevState como argumento?
        React may batch multiple setState() calls into a single update for performance. Because this.props and this.state may be updated asynchronously, you should
        NOT rely on their values for calculating the next state.
        From https://reactjs.org/docs/react-component.html#setstate:
            setState() enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state.
        Think of setState() as a request rather than an immediate command to update the component. For better perceived performance, React may delay it, and then
        update several components in a single pass. React does not guarantee that the state changes are applied immediately.
        https://stackoverflow.com/questions/50837670/reactjs-setstate-previous-state-is-the-first-argument-props-as-the-second-argum/61275983#61275983
        */
        this.setState((prevState, props) => ({
            scale: 1 + deltaScale,
            zoomInCounter: prevState.zoomInCounter + deltaZoomIn
        }), () => console.log("this.state.zoomInCounter: " + this.state.zoomInCounter));
        /* ¿Por qué en el setState no se utiliza this.state.scale como base y se le va sumando o restando el delta a medida que se scrollea? Aparentemente, una
         vez creado el canvas, el valor que recibe al cambiarle la scale no se aplica de forma absoluta, sino relativa a la scale anterior. Por lo que para ampliar
         una imagen inicialmente dibujada a escala 1, setearemos la scale = 1.1, por ejemplo, y redibujaremos la imagen. Pero para el siguiente zoom in, la scale seguirá
         siendo = 1.1 al redibujar la imagen, y no 1.2. */
        console.log("deltaY: " + event.deltaY);
        /* El problema con esta función es que, si bien el contador del state se actualiza apropiadamente, por alguna razón cuando se scrollea muy rápidamente hacia
         arriba (zoom in) se llega a un punto en el que la scale del canvas se desfasa del contador, lo cual permite, luego, seguir haciendo zoom out aún cuando la imagen
         ya estaría en su mínimo tamaño permitible (limitado por el del canvas). Este desfase sucede también en el otro sentido.
         Diagnóstico: botuleao. Evidentemente a lo largo del scroll intenso hay rescalings que se pierden, quizás porque setState agrupa 2 cambios de scale
         consecutivos. El issue con esto es que, como el nuevo valor de la propiedad no depende del valor previo, no podemos "forzar" un update del mismo utilizando
         prevState como hicimos en el otro caso. Lo cual da lugar a la siguiente función como approach alternativo, eliminando la dependencia con el state y
         triggereando el rescaling directamente hacia el canvas.
        */
    }

    _mouseScroll = (event) => {
        event.preventDefault();
        // Si el scroll es hacia abajo
        let deltaZoomInCounter = 0;
        if (event.deltaY > 0 && this.zoomInCounter > 0) {
            this.renderImg(1 - this.state.deltaScale)
            deltaZoomInCounter = -1;
        }
        // Si el scroll es hacia arriba
        if (event.deltaY < 0) {
            this.renderImg(1 + this.state.deltaScale)
            deltaZoomInCounter = 1;
        }
        this.zoomInCounter = this.zoomInCounter + deltaZoomInCounter;
        this.setState((prevState, props) => ({
            zoomInCounter: this.state.zoomInCounter + deltaZoomInCounter
        }), () => console.log("this.state.zoomInCounter: " + this.zoomInCounter));
    }

    _zoom = (event) => {
        let zoomedScale = 1;
        let deltaZoomInCounter = 0;
        if (event.target.textContent === "-" && this.state.zoomInCounter > 0) {
            zoomedScale = 1 - this.state.deltaScale;
            deltaZoomInCounter = -1;
        }
        if(event.target.textContent === "+"){
            zoomedScale = 1 + this.state.deltaScale;
            deltaZoomInCounter = 1;
        }
        this.setState((prevState, props) => ({
            scale: zoomedScale,
            zoomInCounter: prevState.zoomInCounter + deltaZoomInCounter
        }), () => console.log("this.state.zoomInCounter: " + this.state.zoomInCounter));
        console.log(event.target.textContent);
    }

    throttle = (fn, ms) => {
        let timeout;
        function exec() {
            fn.apply()
        }
        function clear() {
            if (timeout === undefined){
                return null
            } else {
                return clearTimeout(timeout)
            }
        }
        if(fn !== undefined && ms !== undefined) {
            timeout = setTimeout(exec, ms)
        } else {
            console.error('callback function and the timeout must be supplied')
        }
        // API to clear the timeout
        this.throttle.clearTimeout = function() {
            clear();
        }
    }

    render() {
        return(
            <div className="backdrop">
                <div id="canvas-modal" className=" justify-items-center">
                    <div id="canvas-container">
                        <canvas id="canvas"
                                ref={this.canvas}
                                width={this.state.canvasWidth}
                                height={this.state.canvasHeight}
                                onWheel={(event) => this.throttle(this._mouseScroll(event),1000)}
                        />
                    </div>
                    <div className="">
                        <button className="btn btn-light" onClick={this._zoom}>
                            -
                        </button>
                        <button className="btn btn-light" onClick={this._zoom}>
                            +
                        </button>
                        <button className="btn btn-success float-right">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cropper;