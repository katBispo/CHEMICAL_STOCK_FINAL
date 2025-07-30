import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Autocomplete, Box, Typography, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

const AnalitoSelector = ({ selectedAnalitos, handleClose, onAnalitoSelect, open }) => {
    const [analitos, setAnalitos] = useState([]);
    const [tiposESubtipos, setTiposESubtipos] = useState([]);
    const [showTiposESubtipos, setShowTiposESubtipos] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedClassificacao, setSelectedClassificacao] = useState(null);

    useEffect(() => {
        const fetchAnalitos = async () => {
            try {
                const response = await fetch('http://localhost:8080/analito');
                if (!response.ok) {
                    throw new Error('Erro ao buscar analitos');
                }
                const data = await response.json();
                setAnalitos(data);

                const tiposMap = {};
                data.forEach(item => {
                    if (item.classificacao && item.tipoAnalito && item.subtipoAnalito) {
                        if (!tiposMap[item.classificacao]) {
                            tiposMap[item.classificacao] = [];
                        }
                        tiposMap[item.classificacao].push({
                            tipo: item.tipoAnalito,
                            subtipos: item.subtipoAnalito,
                            analitoId: item.id
                        });
                    }
                });

                const tiposESubtiposData = Object.entries(tiposMap).map(([classificacao, tipos]) => ({
                    classificacao,
                    tipos
                }));
                setTiposESubtipos(tiposESubtiposData);
                console.log("🔍 Tipos e Subtipos carregados:", JSON.stringify(tiposESubtiposData, null, 2));
            } catch (error) {
                console.error('Erro ao buscar analitos:', error);
            }
        };

        if (open) {
            fetchAnalitos();
        }
    }, [open]);

    const handleAnalitoSelection = (event, value) => {
        setSelectedClassificacao(value);
        setShowTiposESubtipos(!!value);
        console.log("🔍 Classificação selecionada:", value ? value.classificacao : null);
    };

    const handleOptionChange = (classificacao, tipo, subtipo, checked) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [classificacao]: {
                ...(prev[classificacao] || {}),
                [tipo]: {
                    ...(prev[classificacao]?.[tipo] || {}),
                    [subtipo]: checked
                }
            }
        }));
        console.log("🔍 Opções selecionadas:", JSON.stringify({
            ...selectedOptions,
            [classificacao]: {
                ...(selectedOptions[classificacao] || {}),
                [tipo]: {
                    ...(selectedOptions[classificacao]?.[tipo] || {}),
                    [subtipo]: checked
                }
            }
        }, null, 2));
    };

    const handleSave = () => {
        const analitosSelecionados = [];

        tiposESubtipos.forEach((classObj) => {
            const tiposSelecionados = [];

            classObj.tipos.forEach((tipoObj) => {
                const subtiposSelecionados = tipoObj.subtipos.filter(
                    (subtipo) => selectedOptions[classObj.classificacao]?.[tipoObj.tipo]?.[subtipo]
                );

                if (subtiposSelecionados.length > 0) {
                    tiposSelecionados.push({
                        tipo: tipoObj.tipo,
                        subtipos: subtiposSelecionados,
                        analitoId: tipoObj.analitoId
                    });
                }
            });

            if (tiposSelecionados.length > 0) {
                analitosSelecionados.push({
                    classificacao: classObj.classificacao,
                    analitoId: tiposSelecionados[0].analitoId,
                    tipos: tiposSelecionados
                });
            }
        });

        if (analitosSelecionados.length === 0) {
            alert("Por favor, selecione pelo menos um subtipo de analito.");
            return;
        }

        console.log("🔍 Analitos selecionados:", JSON.stringify(analitosSelecionados, null, 2));
        onAnalitoSelect(analitosSelecionados);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Escolha o Analito</DialogTitle>
            <DialogContent>
                <Autocomplete
                    options={tiposESubtipos}
                    getOptionLabel={(option) => option.classificacao || ""}
                    onChange={handleAnalitoSelection}
                    value={selectedClassificacao}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Classificação"
                            required
                            margin="normal"
                            style={{ width: '350px' }}
                        />
                    )}
                />

                {showTiposESubtipos && selectedClassificacao && (
                    tiposESubtipos
                        .filter(item => item.classificacao === selectedClassificacao.classificacao)
                        .map((classObj, index) => (
                            <Box
                                key={index}
                                sx={{
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    marginTop: '10px',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Typography variant="h6">{classObj.classificacao}</Typography>
                                {classObj.tipos.map((tipoObj, idx) => (
                                    <Box key={idx} sx={{ marginLeft: '10px' }}>
                                        <Typography variant="subtitle1">{tipoObj.tipo}</Typography>
                                        <FormGroup>
                                            {tipoObj.subtipos.map((subtipo, sIdx) => (
                                                <FormControlLabel
                                                    key={sIdx}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedOptions[classObj.classificacao]?.[tipoObj.tipo]?.[subtipo] || false}
                                                            onChange={(e) => handleOptionChange(classObj.classificacao, tipoObj.tipo, subtipo, e.target.checked)}
                                                        />
                                                    }
                                                    label={subtipo}
                                                />
                                            ))}
                                        </FormGroup>
                                    </Box>
                                ))}
                            </Box>
                        ))
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Fechar</Button>
                <Button onClick={handleSave} color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AnalitoSelector;