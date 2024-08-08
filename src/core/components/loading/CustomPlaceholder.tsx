import React from 'react';

const CustomPlaceholder = () => {
	return (
		<>
			<div
				style={{
					width: '100%',
					height: '300px', // Altura específica para el placeholder
					backgroundColor: '#ccc', // Color de fondo para el placeholder
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<span>Cargando...</span> {/* Texto o contenido de tu placeholder */}
			</div>
		</>
	);
};

export default CustomPlaceholder;
