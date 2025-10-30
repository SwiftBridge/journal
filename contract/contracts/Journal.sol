// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Journal {
    struct Entry {
        uint256 id;
        address owner;
        string title;
        string content;
        string mood;
        bool isPrivate;
        uint256 timestamp;
        bool exists;
    }

    // State variables
    uint256 public entryFee = 0.0000001 ether;
    address public owner;
    uint256 public entryCounter;

    // Mappings
    mapping(uint256 => Entry) public entries;
    mapping(address => uint256[]) public userEntryIds;

    // Events
    event EntryAdded(uint256 indexed id, address indexed owner, string title, bool isPrivate);
    event EntryUpdated(uint256 indexed id, bool isPrivate);

    constructor() {
        owner = msg.sender;
    }

    // Entry Functions
    function addEntry(
        string memory _title,
        string memory _content,
        string memory _mood,
        bool _isPrivate
    ) public payable {
        require(msg.value >= entryFee, "Insufficient fee");
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_content).length > 0, "Content required");

        uint256 id = entryCounter++;

        entries[id] = Entry({
            id: id,
            owner: msg.sender,
            title: _title,
            content: _content,
            mood: _mood,
            isPrivate: _isPrivate,
            timestamp: block.timestamp,
            exists: true
        });

        userEntryIds[msg.sender].push(id);
        emit EntryAdded(id, msg.sender, _title, _isPrivate);
    }

    function togglePrivacy(uint256 _entryId) public {
        require(entries[_entryId].exists, "Entry does not exist");
        require(entries[_entryId].owner == msg.sender, "Not entry owner");

        entries[_entryId].isPrivate = !entries[_entryId].isPrivate;
        emit EntryUpdated(_entryId, entries[_entryId].isPrivate);
    }

    // View Functions
    function getUserEntries(address _user) public view returns (Entry[] memory) {
        uint256[] memory ids = userEntryIds[_user];
        uint256 activeCount = 0;

        for (uint256 i = 0; i < ids.length; i++) {
            if (entries[ids[i]].exists) {
                // If requesting own entries, return all
                // If requesting others' entries, only return public ones
                if (_user == msg.sender || !entries[ids[i]].isPrivate) {
                    activeCount++;
                }
            }
        }

        Entry[] memory result = new Entry[](activeCount);
        uint256 index = 0;

        for (uint256 i = 0; i < ids.length; i++) {
            if (entries[ids[i]].exists) {
                if (_user == msg.sender || !entries[ids[i]].isPrivate) {
                    result[index] = entries[ids[i]];
                    index++;
                }
            }
        }

        return result;
    }

    function getEntry(uint256 _entryId) public view returns (
        uint256 id,
        address entryOwner,
        string memory title,
        string memory content,
        string memory mood,
        bool isPrivate,
        uint256 timestamp,
        bool exists
    ) {
        Entry memory entry = entries[_entryId];

        // Only owner can view private entries
        if (entry.isPrivate && entry.owner != msg.sender) {
            revert("Private entry");
        }

        return (
            entry.id,
            entry.owner,
            entry.title,
            entry.content,
            entry.mood,
            entry.isPrivate,
            entry.timestamp,
            entry.exists
        );
    }

    // Owner Functions
    function updateFee(uint256 _newFee) public {
        require(msg.sender == owner, "Only owner");
        entryFee = _newFee;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner");
        payable(owner).transfer(address(this).balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
