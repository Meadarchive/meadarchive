import getBatchQRCodeLink from "../../api/get/getBatchQRCodeLink";

interface QRParams {
    batchLink: string;
}

const BatchQR: React.FC<QRParams> = ({ batchLink }) => {

    return (
        <img
            src={getBatchQRCodeLink(batchLink)}
            alt="qr-code"
        />
    )
}

export default BatchQR;