const ImageSkeleton: React.FC = () => (
	<div className="d-flex justify-content-center align-items-center">
		<div
			style={{ width: '270px', height: '270px', backgroundColor: '#e0e0e0', borderRadius: '8px' }}
		>
			<div
				className="placeholder-glow"
				style={{ width: '100%', height: '100%', borderRadius: '8px' }}
			>
				<div className="placeholder" style={{ width: '100%', height: '100%' }} />
			</div>
		</div>
	</div>
);

export default ImageSkeleton;
