const MetadataModel = require("../models/metadata.model");

module.exports.getMetadata = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).send('ID unknown');
    try {
        const metadata = await MetadataModel.findById({_id: req.params.id});
        res.status(200).json({metadata: metadata});
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}