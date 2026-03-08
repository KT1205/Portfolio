"use client";

class SoundSystem {
    private audioCtx: AudioContext | null = null;
    private initialized = false;
    private muted = true; // Start muted to satisfy browser autoplay policies until user interacts

    public init() {
        if (this.initialized) return;
        try {
            this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.initialized = true;
            this.muted = false; // Unmute on first distinct user action
        } catch (e) {
            console.warn("Web Audio API not supported.", e);
        }
    }

    private playTone(freq: number, type: OscillatorType, duration: number, vol: number) {
        if (!this.audioCtx || this.muted) return;
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
    }

    public hover() {
        // Very soft, high-pitched mechanical tick
        this.playTone(800, "sine", 0.05, 0.02);
    }

    public click() {
        // Lower, solid click
        this.playTone(400, "square", 0.1, 0.03);
    }

    public terminalType() {
        // Rapid soft chirp
        this.playTone(600 + Math.random() * 200, "triangle", 0.05, 0.015);
    }

    public error() {
        // Harsh buzz
        this.playTone(150, "sawtooth", 0.3, 0.05);
    }

    public boot() {
        // Ascending sweep
        if (!this.audioCtx || this.muted) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(200, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.audioCtx.currentTime + 0.8);
        gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, this.audioCtx.currentTime + 0.4);
        gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.8);
    }
}

export const sysSound = typeof window !== 'undefined' ? new SoundSystem() : null;
