//UTILIZO y APLICO EL PATRON DTO/
class ProductosDTO{
    constructor(producto){
        this.nombre = producto.nombre
        this.descripcion = producto.descripcion
        this.codigo = producto.codigo
        this.thumbnail = producto.thumbnail
        this.precio = producto.precio
        this.stock = producto.stock
        this.cantidad = producto.cantidad
    }
};
export default ProductosDTO;