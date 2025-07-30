import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Square, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);
      startTimer();
      
      toast({
        title: "Recording Started",
        description: "Voice recording is now active",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        startTimer();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        stopTimer();
        setIsPaused(true);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      stopTimer();
      
      toast({
        title: "Recording Stopped",
        description: "Audio has been saved successfully",
      });
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-primary" />
          Voice Recording
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recording Status */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            {isRecording && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                <span className="text-lg font-mono text-destructive">
                  {formatTime(recordingTime)}
                </span>
                {isPaused && <span className="text-muted-foreground">(PAUSED)</span>}
              </div>
            )}
          </div>
        </div>

        {/* Recording Controls */}
        <div className="flex justify-center gap-4">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Mic className="w-5 h-5 mr-2" />
              Start Recording
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={pauseRecording}
                variant="outline"
                size="lg"
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                {isPaused ? "Resume" : "Pause"}
              </Button>
              <Button
                onClick={stopRecording}
                variant="destructive"
                size="lg"
              >
                <Square className="w-5 h-5 mr-2" />
                Stop
              </Button>
            </div>
          )}
        </div>

        {/* Audio Playback */}
        {audioURL && (
          <div className="border rounded-lg p-4 bg-muted/50">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Recorded Audio</span>
              <Button
                onClick={playAudio}
                variant="outline"
                size="sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
            <audio
              ref={audioRef}
              src={audioURL}
              onEnded={() => setIsPlaying(false)}
              className="w-full"
              controls
            />
          </div>
        )}

        {/* Recording Tips */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium mb-2">Recording Tips:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Speak clearly and at a normal pace</li>
            <li>• Include property address and key details</li>
            <li>• Mention client preferences and requirements</li>
            <li>• Note any follow-up actions needed</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};