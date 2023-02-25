import { Modal, Button } from "react-bootstrap"
import { useGameContext } from "../context/GameContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons"

interface GameErrorProps {
    errorMessage: string | undefined
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function GameErrorModal({ errorMessage, setErrorMessage }: GameErrorProps) {

    return (
        <Modal className="my-modal" show={errorMessage != undefined} onHide={async () => setErrorMessage(undefined)}>
            <Modal.Header>
                <Modal.Title><FontAwesomeIcon icon={faXmark} /></Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={async () => setErrorMessage(undefined)}>
                    ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}