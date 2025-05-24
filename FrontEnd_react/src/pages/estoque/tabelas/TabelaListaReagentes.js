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
            // Ideal: recarregar a lista de reagentes via props ou outro mecanismo
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
                    overflowX: 'auto',
                    borderRadius: '10px',
                    width: '600px',
                    maxWidth: 800,
                    margin: '0 auto',
                }}
            >
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
