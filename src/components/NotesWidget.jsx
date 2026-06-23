import useStore from '../store/useStore'
import { useState } from 'react'

function NotesWidget() {
  const notes = useStore((state) => state.notes)
  const addNote = useStore((state) => state.addNote)
  const removeNote = useStore((state) => state.removeNote)
  const saveToStorage = useStore((state) => state.saveToStorage)
  const [noteInput, setNoteInput] = useState('')

  const handleAddNote = () => {
    if (noteInput.trim()) {
      addNote(noteInput)
      const state = useStore.getState()
      saveToStorage(state)
      setNoteInput('')
    }
  }

  const handleDeleteNote = (id) => {
    removeNote(id)
    const state = useStore.getState()
    saveToStorage(state)
  }

  return (
    <div className="bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-lg p-6 text-white">
      <h3 className="text-lg font-bold mb-4">Notes</h3>

      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-gray-100 text-sm italic">No notes yet...</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-yellow-700 rounded p-3 flex items-start justify-between gap-2 hover:bg-yellow-600 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-100 break-words">{note.text}</p>
                <p className="text-xs text-gray-200 mt-1">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-gray-200 hover:text-white font-bold text-lg flex-shrink-0"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
          placeholder="Add a note..."
          className="w-full bg-yellow-700 text-white px-3 py-2 rounded text-sm focus:outline-none border border-yellow-400"
        />
        <button
          onClick={handleAddNote}
          className="w-full bg-white text-yellow-600 font-bold py-2 rounded hover:bg-gray-100 transition-all"
        >
          Add Note
        </button>
      </div>
    </div>
  )
}

export default NotesWidget
