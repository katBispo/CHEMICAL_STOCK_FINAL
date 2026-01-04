import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { getAnalitos } from "../../services/AnalitoService";

const AnalitoSelector = ({ handleClose, onAnalitoSelect, open }) => {
  const [tiposESubtipos, setTiposESubtipos] = useState([]);
  const [selectedClassificacao, setSelectedClassificacao] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    if (!open) return;

    const fetchAnalitos = async () => {
      try {
        const data = await getAnalitos();

        if (!Array.isArray(data)) {
          console.error("❌ API não retornou um array:", data);
          return;
        }

        /**
         * Agrupa analitos por classificação
         */
        const agrupado = {};

        data.forEach(item => {
          if (!item.classificacao || !item.tipoAnalito || !Array.isArray(item.subtipos)) {
            return;
          }

          if (!agrupado[item.classificacao]) {
            agrupado[item.classificacao] = [];
          }

          agrupado[item.classificacao].push({
            analitoId: item.id,
            tipo: item.tipoAnalito,
            subtipos: item.subtipos
          });
        });

        const resultado = Object.entries(agrupado).map(
          ([classificacao, tipos]) => ({
            classificacao,
            tipos
          })
        );

        setTiposESubtipos(resultado);
      } catch (error) {
        console.error("Erro ao buscar analitos:", error);
      }
    };

    fetchAnalitos();
  }, [open]);

  const handleOptionChange = (classificacao, tipo, subtipo, checked) => {
    setSelectedOptions(prev => ({
      ...prev,
      [classificacao]: {
        ...(prev[classificacao] || {}),
        [tipo]: {
          ...(prev[classificacao]?.[tipo] || {}),
          [subtipo]: checked
        }
      }
    }));
  };

  const handleSave = () => {
    const analitosSelecionados = [];

    tiposESubtipos.forEach(classObj => {
      classObj.tipos.forEach(tipoObj => {
        tipoObj.subtipos.forEach(subtipo => {
          if (
            selectedOptions[classObj.classificacao]?.[tipoObj.tipo]?.[subtipo]
          ) {
            analitosSelecionados.push({
              analitoId: tipoObj.analitoId,
              classificacao: classObj.classificacao,
              subtipo
            });
          }
        });
      });
    });

    if (analitosSelecionados.length === 0) {
      alert("Selecione pelo menos um subtipo.");
      return;
    }

    onAnalitoSelect(analitosSelecionados);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Escolha o Analito</DialogTitle>

      <DialogContent>
        <Autocomplete
          options={tiposESubtipos}
          getOptionLabel={option => option.classificacao}
          value={selectedClassificacao}
          onChange={(e, value) => setSelectedClassificacao(value)}
          renderInput={params => (
            <TextField {...params} label="Classificação" margin="normal" />
          )}
        />

        {selectedClassificacao && (
          <Box mt={2}>
            {selectedClassificacao.tipos.map((tipoObj, idx) => (
              <Box key={idx} ml={2}>
                <Typography variant="subtitle1">{tipoObj.tipo}</Typography>
                <FormGroup>
                  {tipoObj.subtipos.map((subtipo, sIdx) => (
                    <FormControlLabel
                      key={sIdx}
                      control={
                        <Checkbox
                          checked={
                            selectedOptions[selectedClassificacao.classificacao]
                              ?. [tipoObj.tipo]
                              ?. [subtipo] || false
                          }
                          onChange={e =>
                            handleOptionChange(
                              selectedClassificacao.classificacao,
                              tipoObj.tipo,
                              subtipo,
                              e.target.checked
                            )
                          }
                        />
                      }
                      label={subtipo}
                    />
                  ))}
                </FormGroup>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnalitoSelector;
