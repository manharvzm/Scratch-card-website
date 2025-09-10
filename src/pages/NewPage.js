import React, { useState } from 'react';
import { FaInstagram, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import TaraLoader from './TaraLoader';
import './NewPage.css';

export default function NewPage() {
    const [activeStep, setActiveStep] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({ name: '', mobile: '' });
    const navigate = useNavigate();

    const openMaps = () => {
        window.open(
            'https://www.google.com/maps/place/Manhar+Shopping+Mall/@18.1156812,83.4078516,17z/data=!4m8!3m7!1s0x3a3be55a8568beed:0xdf49dfe85fa3dfc!8m2!3d18.1156761!4d83.4104265!9m1!1b1!16s%2Fg%2F11h1gm43v!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDgxMS4wIKXMDSoASAFQAw%3D%3D',
            '_blank',
            'noopener,noreferrer'
        );
        setActiveStep(3);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        if (!form.name.trim() || !/^[6-9]\d{9}$/.test(form.mobile.trim())) {
            setMessage('Enter a valid name and 10-digit mobile number.');
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('https://admin-backend-orcin-six.vercel.app/api/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: form.name.trim(), mobile: form.mobile.trim() })
            });
            if (!res.ok) throw new Error('Failed');
            setMessage('Data submitted successfully.');
            setActiveStep(2);
            setShowForm(false);
        } catch {
            setMessage('Submission failed. Try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="page-wrap">
            {submitting && <TaraLoader />}

            <div className="bg">
                <div className="bg-vignette" />
                <div className="ticket-edge te-top" />
                <div className="ticket-edge te-bottom" />
                <div className="foil"></div>
                <div className="confetti">
                    {Array.from({ length: 48 }).map((_, i) => (
                        <span key={i} style={{ '--i': i + 1 }} />
                    ))}
                </div>
                <div className="ribbons">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <i key={i} style={{ '--j': i + 1 }} />
                    ))}
                </div>
                <div className="spark-shards">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <b key={i} style={{ '--k': i + 1 }} />
                    ))}
                </div>
            </div>

            <div className="content">
                <div className="hero-card">
                    <h1 className="mall-title">
                        <span>Manhar Shopping Mall</span>
                        <i />
                    </h1>

                    <div className="socials">
                        <a
                            className="social-btn"
                            href="https://www.instagram.com/_attach.com_?igsh=MXhpZWI4Z2FjaHJhZQ=="
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            className="social-btn"
                            href="https://www.google.com/maps/place/Manhar+Shopping+Mall"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Google Maps"
                        >
                            <FaGoogle />
                        </a>
                        <a
                            className="social-btn"
                            href="https://www.instagram.com/_attach.com_?igsh=MXhpZWI4Z2FjaHJhZQ=="
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                    </div>

                    {message && <div className="flash">{message}</div>}

                    <div className="steps">
                        <button
                            className={`step-btn ${activeStep >= 1 ? 'active' : ''}`}
                            onClick={() => {
                                setShowForm(true);
                                setActiveStep(1);
                            }}
                        >
                            Fill the form
                        </button>

                        {showForm && (
                            <div className="inline-form-wrap">
                                <div className="inline-form-glow" />
                                <form className="inline-form" onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        maxLength={40}
                                        className="in"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Mobile number"
                                        value={form.mobile}
                                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                        maxLength={10}
                                        className="in"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                    />
                                    <button className="submit" type="submit">Submit</button>
                                </form>
                            </div>
                        )}

                        <button
                            className={`step-btn ${activeStep >= 2 ? 'active' : 'locked'}`}
                            onClick={() => {
                                if (activeStep >= 2) openMaps();
                            }}
                            disabled={activeStep < 2}
                        >
                            Give the feedback
                        </button>

                        <button
                            className={`step-btn ${activeStep >= 3 ? 'active' : 'locked'}`}
                            onClick={() => {
                                if (activeStep >= 3) navigate('/scratch');
                            }}
                            disabled={activeStep < 3}
                        >
                            scratch & win
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
