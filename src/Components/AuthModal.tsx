import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface AuthModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onRequestClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [formType, setFormType] = useState<'LOGIN' | 'SIGNUP' | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (formType === 'SIGNUP') {
            if (password !== confirmPassword) {
                setError("Les mots de passe ne correspondent pas.");
                return;
            }

            if (email !== confirmEmail) {
                setError("Les adresses e-mail ne correspondent pas.");
                return;
            }

            fetch('http://localhost:3000/users/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: email.trim(), password: password.trim() })
            })
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 409) {
                            throw new Error('Un compte avec cet e-mail existe déjà.');
                        } else {
                            throw new Error('Une erreur s\'est produite. Veuillez réessayer.');
                        }
                    }
                    return response.json();
                })
                .then(data => {
                    document.cookie = `token=${data.token}; path=/`; // Assurez-vous que le serveur renvoie un token.
                })
                .catch(error => setError(error.message));
        } else if (formType === 'LOGIN') {
            fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: email, password })
            })
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            throw new Error('Aucun compte avec cet e-mail n\'a été trouvé.');
                        } else {
                            throw new Error('Une erreur s\'est produite. Veuillez réessayer.');
                        }
                    }
                    return response.json();
                })
                .then(data => {
                    document.cookie = `token=${data.token}; path=/`; // Assurez-vous que le serveur renvoie un token.
                })
                .catch(error => setError(error.message));
        }

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setConfirmEmail('');
        setError('');

        onRequestClose();
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(5px)'
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40%',
                    padding: '30px',
                    backgroundColor: 'white',
                    border: 'none'
                }
            }}
        >
            {!formType ? (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <button
                        onClick={() => {
                            setFormType('LOGIN');
                            setError('');
                        }}
                        style={{ padding: '10px', backgroundColor: '#008000', color: 'white', borderRadius: '5px' }}
                    >
                        Connexion
                    </button>
                    <button
                        onClick={() => {
                            setFormType('SIGNUP');
                            setError('');
                        }}
                        style={{ padding: '10px', backgroundColor: '#008000', color: 'white', borderRadius: '5px' }}
                    >
                        Créer un compte
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {formType === 'SIGNUP' && (
                        <>
                            <label>
                                Adresse e-mail:
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{ padding: '10px' }}
                                />
                            </label>
                            <label>
                                Confirmer l'adresse e-mail:
                                <input
                                    type="email"
                                    value={confirmEmail}
                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                    required
                                    style={{ padding: '10px' }}
                                />
                            </label>
                        </>
                    )}
                    {formType === 'LOGIN' && (
                        <label>
                            Adresse e-mail:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ padding: '10px' }}
                            />
                        </label>
                    )}
                    <label>
                        Mot de passe:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ padding: '10px' }}
                        />
                    </label>
                    {formType === 'SIGNUP' && (
                        <label>
                            Confirmer le mot de passe:
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                style={{ padding: '10px' }}
                            />
                        </label>
                    )}
                    <button
                        type="submit"
                        style={{ padding: '10px', backgroundColor: '#008000', color: 'white', borderRadius: '5px' }}
                    >
                        {formType === 'LOGIN' ? 'Se connecter' : 'Créer un compte'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            )}
        </Modal>
    );
};

export default AuthModal;
