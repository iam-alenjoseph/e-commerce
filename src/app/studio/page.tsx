import StudioLayout from '@/components/DesignStudio/StudioLayout';

export default function StudioPage() {
  return (
    // We add a wrapper class to let StudioLayout know it should be full screen if we want
    <div className="studio-mode">
      <StudioLayout />
    </div>
  );
}
