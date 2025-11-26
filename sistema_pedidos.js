// ------------------------------
// Sistema de Pedidos con Patrones de Diseño
// ------------------------------

// === PATRÓN SINGLETON ===
// Clase que gestiona todos los pedidos del sistema
class PedidoManager {
  constructor() {
    if (PedidoManager.instance) {
      return PedidoManager.instance; // Garantiza una sola instancia
    }
    this.pedidos = [];
    PedidoManager.instance = this;
  }

  agregarPedido(pedido) {
    this.pedidos.push(pedido);
    console.log(`🆕 Pedido agregado: ${pedido}`);
  }

  obtenerPedidos() {
    return this.pedidos;
  }
}

// === PATRÓN OBSERVER ===
// Clase principal que notifica a los observadores
class PedidoSubject {
  constructor() {
    this.observadores = [];
  }

  agregarObservador(obs) {
    this.observadores.push(obs);
  }

  eliminarObservador(obs) {
    this.observadores = this.observadores.filter(o => o !== obs);
  }

  notificar(pedido) {
    this.observadores.forEach(obs => obs.actualizar(pedido));
  }
}

// Clases observadoras que reaccionan ante un nuevo pedido
class Cliente {
  actualizar(pedido) {
    console.log(`📩 Cliente notificado: se ha creado el ${pedido}`);
  }
}

class Despacho {
  actualizar(pedido) {
    console.log(`🚚 Despacho notificado: preparar ${pedido}`);
  }
}

class Administracion {
  actualizar(pedido) {
    console.log(`💼 Administración notificada: registrar ${pedido}`);
  }
}

// === SIMULACIÓN DEL SISTEMA ===

// Crear instancia Singleton de gestión de pedidos
const gestorPedidos = new PedidoManager();

// Crear el sistema de notificaciones (Observer)
const sistemaNotificaciones = new PedidoSubject();

// Crear observadores
const cliente = new Cliente();
const despacho = new Despacho();
const admin = new Administracion();

// Registrar los observadores
sistemaNotificaciones.agregarObservador(cliente);
sistemaNotificaciones.agregarObservador(despacho);
sistemaNotificaciones.agregarObservador(admin);

// Agregar pedidos al sistema y notificar
function nuevoPedido(nombrePedido) {
  gestorPedidos.agregarPedido(nombrePedido);
  sistemaNotificaciones.notificar(nombrePedido);
}

// === Ejecución del sistema ===
console.log("=== SISTEMA DE PEDIDOS INICIADO ===\n");

nuevoPedido("Pedido #001 - Laptop Lenovo");
nuevoPedido("Pedido #002 - Monitor Samsung");

console.log("\n📦 Lista de pedidos actuales:", gestorPedidos.obtenerPedidos());
console.log("\n=== SISTEMA DE PEDIDOS FINALIZADO ===");