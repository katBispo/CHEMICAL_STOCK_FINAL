import React, { useState } from 'react';
import { Paper, IconButton } from '@mui/material';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import ReagenteDetailOverlay from '../../components/ReagenteListaIcons/ReagenteDetailOverlay';
import ReagenteEditOverlay from '../../components/ReagenteListaIcons/ReagenteEditOverlay';
import ReagenteExcluirOverlay from '../../components/ReagenteListaIcons/ReagenteExcluirOverlay';

const TabelaListaReagentes = ({ reagentes, onSave }) => {
    const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false);
    const [selectedReagente, setSelectedReagente] = useState(null);
    const [open, setOpen] = useState(false);
    const [editOverlayOpen, setEditOverlayOpen] = useState(false);
    const [reagenteToEdit, setReagenteToEdit] = useState(null);
    const [showOverlay, setShowOverlay] = useState(true); // controla a exibição do overlay

    const handleOpenDeleteOverlay = (reagente) => {
        setSelectedReagente(reagente);
        setOpenDeleteOverlay(true);
    };

    const handleCloseDeleteOverlay = () => {
        setOpenDeleteOverlay(false);
        setSelectedReagente(null);
    };

    const handleDeleteReagente = async (id) => {
        const response = await fetch(`http://localhost:8080/reagente/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Reagente excluído com sucesso');
        } else {
            console.error('Erro ao excluir reagente');
        }

        handleCloseDeleteOverlay();
    };

    const handleEditClick = (reagente) => {
        setReagenteToEdit(reagente);
        setEditOverlayOpen(true);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    position: 'relative',
                    overflowX: 'auto',
                    borderRadius: '10px',
                    width: '600px',
                    margin: '0 auto',
                }}
            >
                {/* Overlay de destaque */}
                {showOverlay && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(255, 255, 255, -55)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '16px',
                            padding: '30px 40px',
                            zIndex: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px' }}>
                            Visualização rápida da lista de reagentes
                        </p>
                        <button
                            style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '999px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                                transition: 'all 0.3s ease',
                            }}
                            onClick={() => setShowOverlay(false)}
                            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                            onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
                        >
                            Ver mais
                        </button>
                    </div>
                )}

                <table style={{ width: '100%' }}>
                    <thead style={{ backgroundColor: '#4CAF50' }}>
                        <tr>
                            <th style={thStyle}>Nome</th>
                            <th style={thStyle}>Tipo</th>
                            <th style={thStyle}>Quantidade Frascos</th>
                            <th style={thStyle}>Lote</th>
                            <th style={thStyle}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reagentes.map((r) => (
                            <tr
                                key={r.id}
                                style={{ transition: 'background-color 0.3s' }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                            >
                                <td style={tdStyle}>{r.nome}</td>
                                <td style={tdStyle}>{r.tipo}</td>
                                <td style={tdStyle}>{r.quantidadeDeFrascos}</td>
                                <td style={tdStyle}>{r.lote}</td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                        <IconButton onClick={() => { handleOpen(); setSelectedReagente(r); }}>
                                            <FaEye style={{ color: '#666', fontSize: '18px' }} />
                                        </IconButton>
                                        <IconButton onClick={() => handleEditClick(r)}>
                                            <FaEdit style={{ color: '#4CAF50', fontSize: '18px' }} />
                                        </IconButton>
                                        <IconButton onClick={() => handleOpenDeleteOverlay(r)}>
                                            <FaTrashAlt style={{ color: '#e74c3c', fontSize: '18px' }} />
                                        </IconButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Paper>

            {/* --- MODAIS ABAIXO DA TABELA --- */}
            {selectedReagente && (
                <ReagenteDetailOverlay
                    open={open}
                    onClose={handleClose}
                    reagente={selectedReagente}
                />
            )}

            {reagenteToEdit && (
                <ReagenteEditOverlay
                    open={editOverlayOpen}
                    onClose={() => setEditOverlayOpen(false)}
                    reagente={reagenteToEdit}
                    onSave={onSave}
                />
            )}

            {selectedReagente && (
                <ReagenteExcluirOverlay
                    open={openDeleteOverlay}
                    onClose={handleCloseDeleteOverlay}
                    onDelete={() => handleDeleteReagente(selectedReagente.id)}
                    reagente={selectedReagente}
                />
            )}
        </>
    );
};

const thStyle = {
    color: '#fff',
    padding: '12px 24px',
    textAlign: 'left',
    fontWeight: 'bold',
};

const tdStyle = {
    padding: '12px 24px',
};

export default TabelaListaReagentes;
