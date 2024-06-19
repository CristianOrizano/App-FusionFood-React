import { getBase64ImageFromURL } from '@/core/helpers/FileHelper';
import { OrdenResponse } from '../../domain/OrdenResponse';
import JsPDF, { jsPDF } from 'jspdf';
import LOGO from '@/core/imagenes/logoDash.png';
import autoTable from 'jspdf-autotable';

import { detalleOrdenPorId } from '../../infraestructura/repository/OrdenRepository';

export const pdfHojaResumen = async (id?: number, dataOrden?: OrdenResponse): Promise<void> => {
	try {
		const datad = await detalleOrdenPorId(Number(id));
		const doc = new jsPDF();

		// Cargar el logo
		const logo = await getBase64ImageFromURL(LOGO);
		doc.addImage(logo, 'PNG', 10, 5, 50, 20);
		// Título del reporte con decoración
		doc.setFontSize(22);
		doc.setTextColor('#3e7cb1');
		doc.setFont('helvetica', 'bold');
		doc.text('Reporte de Orden', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

		// Subrayar el título
		const titleWidth = doc.getTextWidth('Reporte de Orden');
		doc.setDrawColor('#3e7cb1');
		doc.setLineWidth(0.5);
		doc.line(
			(doc.internal.pageSize.getWidth() - titleWidth) / 2,
			32,
			(doc.internal.pageSize.getWidth() + titleWidth) / 2,
			32,
		);

		// Información del cliente y de la orden
		doc.setFontSize(12);
		doc.setTextColor('#666666');

		// Texto resaltado
		doc.setFont('helvetica', 'bold');
		doc.text('Cliente:', 10, 50);
		doc.text('Fecha:', 10, 60);
		doc.text('Dirección:', 10, 70);
		doc.text('Teléfono:', 10, 80);
		doc.text('Comentarios:', 10, 90);

		// Texto normal
		doc.setFont('helvetica', 'normal');
		doc.text(dataOrden?.cliente.nombres ?? '', 40, 50);
		doc.text(dataOrden?.fechaOrden ?? '', 40, 60);
		doc.text(dataOrden?.direccion ?? '', 40, 70);
		doc.text(dataOrden?.cliente.telefono + '', 40, 80);
		doc.text(dataOrden?.comentario ?? '', 40, 90);

		// Configurar las columnas y los datos de la tabla
		const columns = ['ID', 'Descripción', 'Cantidad', 'Precio', 'Importe'];

		const rows = datad.map(item => [
			item.foodMenu.id,
			item.foodMenu.nombre,
			item.cantidad,
			item.foodMenu.precio,
			item.foodMenu.precio * item.cantidad,
		]);

		// Estilos para la tabla
		const tableHeight = rows.length * 10;
		autoTable(doc, {
			startY: 100,
			head: [columns],
			body: rows,
			theme: 'grid',
			headStyles: {
				fillColor: [22, 160, 133],
				textColor: [255, 255, 255],
				fontSize: 12,
			},
			bodyStyles: {
				textColor: [50, 50, 50],
			},
			alternateRowStyles: {
				fillColor: [240, 240, 240],
			},
			margin: { top: 100 },
		});
		// Calcular el subtotal, el costo de entrega y el total
		const subtotal = rows.reduce((acc, row) => acc + (row[4] as number), 0); // Sumar los importes
		const deliveryCost = 6; // Costo de entrega
		const total = subtotal + deliveryCost; // Total a pagar

		// Agregar el subtotal, el costo de entrega y el total al documento
		const finalYPosition = 100 + tableHeight + 20; // Posición y después de la tabla

		doc.setFont('helvetica', 'bold');
		doc.text('Subtotal:', 10, finalYPosition);
		doc.text('Costo de Entrega:', 10, finalYPosition + 10);
		doc.text('Total a Pagar:', 10, finalYPosition + 20);

		doc.setFont('helvetica', 'normal');
		doc.text(subtotal.toFixed(2) + ' soles', 50, finalYPosition);
		doc.text(deliveryCost.toFixed(2) + ' soles', 50, finalYPosition + 10);
		doc.text(total.toFixed(2) + ' soles', 50, finalYPosition + 20);
		// Guardar el PDF
		doc.save('Reporte-Orden.pdf');
	} catch (error) {
		console.error('Error al generar el PDF:', error);
	}
};
