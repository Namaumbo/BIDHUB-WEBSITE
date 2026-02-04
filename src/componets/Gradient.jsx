import { useEffect, useRef } from 'react'
import { NeatGradient } from '@firecms/neat'

/**
 * Renders a NeatGradient canvas behind its children.
 */
export default function BackgroundGradient({ children }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const gradient = new NeatGradient({
            ref: canvasRef.current,
            colors: [
                {
                    color: '#FFFFFF',
                    enabled: true,
                },
                {
                    color: '#F5F5F5',
                    enabled: true,
                },
                {
                    color: '#D5ECEB',
                    enabled: true,
                },
                {
                    color: '#FFFFFF',
                    enabled: true,
                },
                {
                    color: '#D7E8F3',
                    enabled: true,
                },
            ],
            speed: 2,
            horizontalPressure: 4,
            verticalPressure: 5,
            waveFrequencyX: 4,
            waveFrequencyY: 3,
            waveAmplitude: 2,
            shadows: 4,
            highlights: 7,
            colorBrightness: 1,
            colorSaturation: 0,
            wireframe: false,
            colorBlending: 7,
            backgroundColor: '#00A2FF',
            backgroundAlpha: 1,
            grainScale: 100,
            grainSparsity: 0,
            grainIntensity: 0.05,
            grainSpeed: 0.3,
            resolution: 0.5,
            yOffset: 3373,
            yOffsetWaveMultiplier: 1.5,
            yOffsetColorMultiplier: 1.8,
            yOffsetFlowMultiplier: 2,
            flowDistortionA: 0.4,
            flowDistortionB: 3,
            flowScale: 3.3,
            flowEase: 0.53,
            flowEnabled: true,
            mouseDistortionStrength: 0.12,
            mouseDistortionRadius: 0.25,
            mouseDecayRate: 0.96,
            mouseDarken: 0.24,
            enableProceduralTexture: false,
            textureVoidLikelihood: 0.06,
            textureVoidWidthMin: 10,
            textureVoidWidthMax: 500,
            textureBandDensity: 0.8,
            textureColorBlending: 0.06,
            textureSeed: 333,
            textureEase: 0.75,
            proceduralBackgroundColor: '#003FFF',
            textureShapeTriangles: 20,
            textureShapeCircles: 15,
            textureShapeBars: 15,
            textureShapeSquiggles: 10,
        })

        return () => gradient.destroy()
    }, [])

    return (
        <div className="bg-gradient" style={{ position: 'relative', minHeight: '100%' }}>
            <canvas
                ref={canvasRef}
                className="bg-gradient-canvas"
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            <div className="bg-gradient-content" style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    )
}


