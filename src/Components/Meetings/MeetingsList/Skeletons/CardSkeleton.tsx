import './skeleton.css'

interface CardSkeletonProps {
    
}

export const CardSkeleton: React.FC<CardSkeletonProps> = () => {
    return (
        <div className="skeleton-meeting-card">
        <div className="skeleton-card-header">
            <div className="skeleton skeleton-date"></div>
            <div className="skeleton skeleton-button"></div>
        </div>
        <div className="skeleton-card-body">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-descr"></div>
            <div className="skeleton skeleton-descr short"></div>
            
            <div className="skeleton-speakers">
                <div className="skeleton skeleton-speakers-title"></div>
                <div className="skeleton skeleton-speaker"></div>
            </div>
            
            <div className="skeleton-followers">
                <div className="skeleton skeleton-avatar"></div>
                <div className="skeleton skeleton-avatar"></div>
                <div className="skeleton skeleton-avatar"></div>
                <div className="skeleton skeleton-followers-text"></div>
            </div>
        </div>
    </div>
    );
};

