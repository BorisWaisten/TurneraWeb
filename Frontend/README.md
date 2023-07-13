\# 1. Introduccion
Se presenta un modelo para una app de turnos de padel y tenis, con requisitos y reglas de
negocios, para facilitar la reserva de pistas y mejorar la experiencia de los usuarios al
disfrutar de su deporte favorito.
\# 2. Requerimientos del sistema
\## 2.1 Funcionales

- Registro de usuarios: permitir a los usuarios registrarse y crear una cuenta con
  información requerida.
- Inicio de sesión: poder iniciar sesión en la aplicación con sus credenciales de usuario
  para acceder a su perfil y realizar reservas.
- Visualización de instalaciones: mostrar una lista de las instalaciones disponibles para
  reservar pistas de padel o tenis, incluyendo información sobre la ubicación, horarios de
  apertura y cierre, y el nivel de ocupación.
- Reservas de pistas: poder reservar pistas de padel o tenis para una fecha y hora
  específicas, y recibir una confirmación de su reserva.
- Cancelación de reservas: opción de cancelar reservas si surge algún imprevisto aplicando
  políticas de cancelación con reglas claras para garantizar la disponibilidad de las pistas.

  \## 2.2 No funcionales

- Usabilidad: la aplicación debe ser fácil de usar para los usuarios, con una interfaz
  clara e intuitiva que permita a los usuarios realizar reservas sin dificultad.
- Disponibilidad: la aplicación debe estar disponible para los usuarios en todo momento,
  sin interrupciones en el servicio.
- Seguridad: la aplicación debe contar con medidas de seguridad para proteger los datos
  personales de los usuarios y los pagos realizados en la plataforma.
- Rendimiento: la aplicación debe tener un alto rendimiento para garantizar que las reservas
  se realicen de manera eficiente y sin demoras.
- Mantenimiento: la aplicación debe ser fácil de mantener y actualizar para corregir errores
  y agregar nuevas funcionalidades sin afectar a los usuarios.
- Compatibilidad: la aplicación debe ser compatible con diferentes dispositivos y sistemas
  operativos para permitir que la mayoría de los usuarios accedan a ella.
- Experiencia de usuario: la aplicación debe proporcionar una experiencia de usuario
  satisfactoria, con diseños y funcionalidades atractivas que mejoren la interacción y satisfacción de los usuarios.
- Cumplimiento normativo: la aplicación debe cumplir con las regulaciones y leyes
  aplicables para garantizar la protección de datos personales .
  \# 3. Reglas de negocio

-Politica de usuario:
-item1: El correo electrónico del usuario debe ser único y no puede modificarse una vez registrado.
-item2: El usuario tiene la capacidad de modificar sus atributos, pero el nombre de usuario debe mantener su autenticidad.

- Política de reservas:
  -item1: Los usuarios solo pueden reservar una pista por día.
  -item2: Los usuarios solo pueden reservar una pista por día.
  -item3: Los usuarios con deudas pendientes no pueden realizar una reserva.

- Politica de Cancelacion:
  -item1: Los usuarios tienen la posibilidad de cancelar una reserva.
  -item2: Si la cancelación se realiza con menos de 24 horas de anticipación, se aplicará una multa de $2000, que equivale al valor de la reserva.
