import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LuUpload, LuFileAudio, LuSparkles } from 'react-icons/lu';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { setUploadDialogOpen } from '../../redux/slices/uiSlice';
import { addUploadedMeeting, markMeetingCompleted } from '../../redux/slices/meetingsSlice';
import { simulateUploadProcessing } from '../../services/mockApi';
import { ROUTES } from '../../constants/routes';

export default function UploadDialog() {
  const isOpen = useSelector((s) => s.ui.uploadDialogOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [fileName, setFileName] = useState(null);
  const [stage, setStage] = useState('idle'); // idle | transcribing | analyzing | done

  const reset = () => {
    setFileName(null);
    setStage('idle');
  };

  const close = () => {
    dispatch(setUploadDialogOpen(false));
    reset();
  };

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
  };

  const startProcessing = async () => {
    const meetingId = crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : `${Date.now()}`;
    dispatch(addUploadedMeeting(fileName, meetingId));
    setStage('transcribing');
    await simulateUploadProcessing();
    setStage('analyzing');
    await simulateUploadProcessing();
    dispatch(markMeetingCompleted(meetingId));
    setStage('done');
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Upload a meeting recording" description="MeetMind will transcribe it and generate a summary automatically.">
      {stage === 'idle' && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-surface-border dark:border-surface-border-dark rounded-xl py-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="audio/*,video/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="h-11 w-11 rounded-xl bg-primary-light dark:bg-blue-500/10 flex items-center justify-center text-primary mb-3">
            <LuUpload size={20} />
          </div>
          <p className="text-sm font-medium text-ink dark:text-ink-dark">
            {fileName ? fileName : 'Drag and drop, or click to browse'}
          </p>
          <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-1">MP3, MP4, WAV, or M4A — up to 4 hours</p>
        </div>
      )}

      {stage !== 'idle' && stage !== 'done' && (
        <div className="py-8 flex flex-col items-center text-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-primary-light dark:bg-blue-500/10 flex items-center justify-center text-primary animate-pulse-soft">
            {stage === 'transcribing' ? <LuFileAudio size={20} /> : <LuSparkles size={20} />}
          </div>
          <p className="text-sm font-medium text-ink dark:text-ink-dark">
            {stage === 'transcribing' ? 'Transcribing audio...' : 'Generating summary & action items...'}
          </p>
          <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark max-w-xs">
            {fileName} is being processed. This usually takes under a minute.
          </p>
        </div>
      )}

      {stage === 'done' && (
        <div className="py-8 flex flex-col items-center text-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-success-light dark:bg-green-500/10 flex items-center justify-center text-success">
            <LuSparkles size={20} />
          </div>
          <p className="text-sm font-medium text-ink dark:text-ink-dark">Your meeting is ready</p>
          <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark max-w-xs">
            Summary and action items have been added to Meetings.
          </p>
        </div>
      )}

      {stage === 'idle' && (
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={close}>Cancel</Button>
          <Button variant="primary" icon={LuUpload} disabled={!fileName} onClick={startProcessing}>
            Upload & process
          </Button>
        </div>
      )}

      {stage === 'done' && (
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={close}>Close</Button>
          <Button
            variant="primary"
            onClick={() => {
              close();
              navigate(ROUTES.MEETINGS);
            }}
          >
            View meetings
          </Button>
        </div>
      )}
    </Modal>
  );
}
