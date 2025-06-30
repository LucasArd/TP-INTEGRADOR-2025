export class Vista {
  static instancia = null;
  pagBienvenida = null;
  pagProductos = null;
  pagZapatillas = null;
  pagBotines = null;
  pagCarrito = null;
  pagLogin = null;
  pagAlta = null;
  pagMod = null;
  header = null;

  constructor() {
    if (Vista.instancia) {
      return Vista.instancia;
    }
    Vista.instancia = this;
  }

  static getInstance() {
    if (!Vista.instancia) {
      Vista.instancia = new Vista();
    }
    return Vista.instancia;
  }

  init() {
    this.initPagBienvenida();
    this.initPagProductos();
    this.initPagZapatillas();
    this.initPagBotines();
    this.initPagCarrito();
    this.initPagAlta();
    this.initPagMod();
    this.initPagLogin();

    this.initHeader();

    this.initTheme();
    this.setearLogo();
    this.initPagVentas();

    if (this.header?.btnNavDesplegable) {
      this.abrirNavegacionResp();
    }
  }

  initPagBienvenida() {
    const frm = this.$("frmBienvenida");
    if (!frm) return;
    this.pagBienvenida = {
      frmBienvenida: frm,
      txtUsuario: this.$("basic-url"),
      btnContinuar: this.$("btn-continuar"),
      imgLogoCircular: this.$("img-circular"),
      btnAdmin: this.$("btnAdmin"),
    };
  }

  initPagProductos() {
    const divCalzados = this.$("divCalzados");
    if (divCalzados) {
      this.pagProductos = { divCalzados };
    }
  }

  initPagZapatillas() {
    const divZ = this.$("zapatillas");
    if (!divZ) return;
    this.pagZapatillas = {
      divZapatillas: divZ,
      paginadorZapatillas: this.$("paginador-zapatillas"),
      prevZapatillas: this.$("prevZapatillas"),
      nextZapatillas: this.$("nextZapatillas"),
    };
  }

  initPagBotines() {
    const divB = this.$("botines");
    if (!divB) return;
    this.pagBotines = {
      divBotines: divB,
      paginadorBotines: this.$("paginador-botines"),
      prevBotines: this.$("prevBotines"),
      nextBotines: this.$("nextBotines"),
    };
  }

  initPagCarrito() {
    const divC = this.$("carrito");
    if (!divC) return;
    this.pagCarrito = {
      divCarrito: divC,
      modalConfirmacion: this.$("modalConfirmacion"),
      btnConfirmarModal: this.$("btnConfirmarModal"),
    };
  }

  initPagAlta() {
    const tipoSelect = this.$("selType");
    if (!tipoSelect) return;
    this.pagAlta = {
      selType: tipoSelect,
      frmAltaProducto: this.$("formAltaProducto"),
      txtSneakerType: this.$("txtSneakerType"),
      selBotinType: this.$("selBotinType"),
      txtSpike: this.$("txtSpike"),
      modalExito: this.$("modalExito"),
      modalError: this.$("modalError"),
    };
  }

  initPagMod() {
    const precio = this.$("txtPrice");
    if (!precio) return;
    this.pagMod = {
      txtPrice: precio,
      btnGuardar: this.$("btnGuardar"),
    };
  }

  initPagLogin() {
    const btn = this.$("btnLogin");
    if (!btn) return;
    this.pagLogin = {
      frmLogin: this.$("frmLogin"),
      btnClient: this.$("btnClient"),
      btnLogin: btn,
      txtEmail: this.$("txtEmail"),
      txtPass: this.$("txtPass"),
      btnPassOn: this.$("btnPassOn"),
      btnPassOff: this.$("btnPassOff"),
      aAccesoRapido: this.$("aAccesoRapido"),
    };
  }

  initHeader() {
    this.header = {
      imgLogoNav: this.$("contenedor-logo-img-nav"),
      botonTheme: this.$("boton-theme"),
      btnNavDesplegable: this.$("btnNavDesplegable"),
      navMenu: this.$("navMenu"),
    };
  }

  $(x) {
    return document.getElementById(x);
  }

  toggleCampos() {
    if (!this.pagAlta?.selType) return;

    const tipo = this.pagAlta.selType.value;
    const camposBotin = ["selBotinType", "txtSpike"];
    const camposZapatilla = ["txtSneakerType"];

    camposBotin.forEach((id) => {
      this.$(id).closest(".mb-3").style.display =
        tipo === "Botin" ? "block" : "none";
    });

    camposZapatilla.forEach((id) => {
      this.$(id).closest(".mb-3").style.display =
        tipo === "Zapatilla" ? "block" : "none";
    });

    // Al cambiar el tipo de calzado, también actualizamos txtSpike
    if (tipo !== "Botin") {
      // Asegurarse de ocultar y limpiar spike si NO está en Botin
      if (this.pagAlta.txtSpike) {
        this.pagAlta.txtSpike.closest(".mb-3").style.display = "none";
        this.pagAlta.txtSpike.value = "";
      }
    } else {
      // Si es Botin, revisar el tipo de botin para mostrar txtSpike si es necesario
      this.toggleCamposBotin();
    }
  }

  toggleCamposBotin() {
    if (!this.pagAlta?.selBotinType) return;

    const tipo = this.pagAlta.selBotinType.value;
    const spike = this.$("txtSpike");

    if (spike) {
      const contenedorSpike = spike.closest(".mb-3");
      contenedorSpike.style.display = tipo === "Cesped" ? "block" : "none";

      if (tipo !== "Cesped") {
        spike.value = "";
      }
    }
  }

  initTheme() {
    const body = document.body;
    const temas = ["modoClaro", "modoOscuro", "modoJPI"];
    let temaActual = localStorage.getItem("theme") || "modoJPI";

    body.classList.add(temaActual);

    if (this.header?.botonTheme) {
      this.header.botonTheme.addEventListener("click", () => {
        body.classList.remove(temaActual);
        let nextIndex = (temas.indexOf(temaActual) + 1) % temas.length;
        temaActual = temas[nextIndex];
        body.classList.add(temaActual);
        localStorage.setItem("theme", temaActual);
        this.setearLogo();
      });
    }
  }

  setearLogo() {
    const temaActual = localStorage.getItem("theme") || "modoJPI";

    let logoSrc = "/resources/img/imagen_logo_circular.png";
    switch (temaActual) {
      case "modoClaro":
        logoSrc = "/resources/img/imagen_logo_sinfondo.webp";
        break;
      case "modoOscuro":
        logoSrc = "/resources/img/logo_tema_oscuro.png";
        break;
      case "modoJPI":
        logoSrc = "/resources/img/imagen_logo_circular.webp";
        break;
    }

    if (this.pagBienvenida?.imgLogoCircular) {
      this.pagBienvenida.imgLogoCircular.src = logoSrc;
    }

    if (this.header?.imgLogoNav) {
      this.header.imgLogoNav.src = logoSrc;
    }
  }

  abrirNavegacionResp() {
    if (!this.header?.btnNavDesplegable || !this.header?.navMenu) return;

    if (this.header.btnNavDesplegable.dataset.listenerAgregado === "true") {
      return;
    }

    this.header.btnNavDesplegable.addEventListener("click", (e) => {
      const yaVisible =
        this.header.navMenu.classList.contains("nav-menu-visible");

      if (yaVisible) {
        console.log("Ocultando menú");
      } else {
        console.log("Mostrando menú");
      }

      this.header.navMenu.classList.toggle("nav-menu-visible");
    });

    this.header.btnNavDesplegable.dataset.listenerAgregado = "true";
  }

  switcherarVisPass() {
    if (this.pagLogin.txtPass.type === "password") {
      this.pagLogin.txtPass.type = "text";
      this.pagLogin.btnPassOn.style.display = "block";
      this.pagLogin.btnPassOff.style.display = "none";
    } else {
      this.pagLogin.txtPass.type = "password";
      this.pagLogin.btnPassOn.style.display = "none";
      this.pagLogin.btnPassOff.style.display = "block";
    }
  }

  buscarUrlImagen(imgPath) {
    if (!imgPath) {
      return "/resources/img/calzado-default.webp";
    }
    if (imgPath.startsWith("http") || imgPath.startsWith("/resources/")) {
      return imgPath;
    }
    return `/uploads/${imgPath}`;
  }

  initPagVentas() {
    const contenedor = this.$("contenedor-ventas");
    if (contenedor) {
      this.pagVentas = { contenedor };
    }
  }

  limpiarCamposTipo() {
    const tipoSeleccionado = this.pagAlta.selType.value;

    if (tipoSeleccionado === "Botin") {
      this.pagAlta.txtSneakerType.value = "";
    }

    if (tipoSeleccionado === "Zapatilla") {
      this.pagAlta.selBotinType.value = "";
      this.pagAlta.txtSpike.value = "";
    }
  }
}
