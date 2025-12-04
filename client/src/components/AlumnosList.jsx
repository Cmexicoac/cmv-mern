import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const AlumnosList = () => {
  const theme = useTheme();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [gradoFilter, setGradoFilter] = useState('all');

  useEffect(() => {
    let mounted = true;
    const fetchAlumnos = async () => {
      try {
        const response = await axios.get('/api/alumnos');
        if (mounted) setAlumnos(response.data || []);
      } catch (error) {
        console.error('Error fetching alumnos:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAlumnos();
    return () => { mounted = false; };
  }, []);

  const grados = useMemo(() => {
    const setGr = new Set(alumnos.map(a => a.grado).filter(Boolean));
    return ['all', ...Array.from(setGr)];
  }, [alumnos]);

  const filtered = useMemo(() => {
    return alumnos.filter(a => {
      if (gradoFilter !== 'all' && a.grado !== gradoFilter) return false;
      if (!q) return true;
      const text = `${a.nombre} ${a.matricula || ''} ${a.grado || ''}`.toLowerCase();
      return text.includes(q.toLowerCase());
    });
  }, [alumnos, q, gradoFilter]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} mb={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Alumnos</Typography>
          <Typography variant="body2" color="text.secondary">Resumen y lista de alumnos — responsive</Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            size="small"
            placeholder="Buscar por nombre, matrícula o grado"
            value={q}
            onChange={e => setQ(e.target.value)}
            sx={{ minWidth: { xs: '100%', sm: 320 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="grado-filter-label">Grado</InputLabel>
            <Select
              labelId="grado-filter-label"
              value={gradoFilter}
              label="Grado"
              onChange={e => setGradoFilter(e.target.value)}
            >
              {grados.map(g => (
                <MenuItem key={g} value={g}>{g === 'all' ? 'Todos los grados' : g}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {filtered.length === 0 ? (
          <Grid item xs={12}>
            <Card sx={{ p: 3, textAlign: 'center' }} className="app-card">
              <Typography variant="h6">No se encontraron alumnos</Typography>
              <Typography variant="body2" color="text.secondary">Ajusta el filtro o agrega alumnos.</Typography>
            </Card>
          </Grid>
        ) : (
          filtered.map((alumno) => (
            <Grid item key={alumno._id || alumno.matricula} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="app-card"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  p: 1
                }}
              >
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56 }}>
                    {alumno.nombre ? alumno.nombre.charAt(0).toUpperCase() : 'A'}
                  </Avatar>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {alumno.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {alumno.grado || 'Grado no asignado'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      Matrícula: {alumno.matricula || '-'}
                    </Typography>
                  </Box>
                </CardContent>

                {/* Pieza inferior con acciones/estadísticas rápidas */}
                <Box sx={{ px: 2, pb: 2, pt: 0 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{alumno.puntosTotal ?? alumno.puntaje ?? '-'}</Typography>
                    <Typography variant="caption" color="text.secondary">Última actividad: {alumno.ultimaActividad ? new Date(alumno.ultimaActividad).toLocaleDateString() : '—'}</Typography>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default AlumnosList;