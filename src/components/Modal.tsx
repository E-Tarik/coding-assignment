import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
	const modal = isOpen && (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content">
				{children}
				<button className="modal-close" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);

	return createPortal(
		modal,
		document.getElementById('modal-container') as HTMLDivElement,
	);
};
